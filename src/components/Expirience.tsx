import { useKeyboardControls } from '@react-three/drei';
import { useFrame, useThree } from '@react-three/fiber';
import { RapierRigidBody } from '@react-three/rapier';
import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import Character, { MarioState } from './Character';
import Coin from './Coin';
import Enemy from './Enemy';
import FlagPole from './FlagPole';
import Map from './Map';
import PowerUp from './PowerUp';
import { Controls } from './Scene';

export default function Expirience() {
  const isOnFloor = useRef(true);
  const mario = useRef<RapierRigidBody>(null!);
  const { camera } = useThree();

  // Game state
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [levelComplete, setLevelComplete] = useState(false);

  // Mario state management
  const [marioState, setMarioState] = useState<MarioState>({
    size: 'small',
    isDucking: false,
    isGroundPounding: false,
  });

  // Controls
  const leftPress = useKeyboardControls<Controls>(state => state.left);
  const rightPress = useKeyboardControls<Controls>(state => state.right);
  const jumpPress = useKeyboardControls<Controls>(state => state.jump);
  const crouchPress = useKeyboardControls<Controls>(state => state.crouch);
  const [jumpCooldown, setJumpCooldown] = useState(false);

  // Coin positions
  const coinPositions: [number, number, number][] = [
    [10, 3, 0],
    [13, 3, 0],
    [15, 3, 0],
    [17, 5, 0],
    [23, 6, 0],
    [32, 5, 0],
    [38, 3, 0],
  ];

  // PowerUp positions
  const powerUpPositions = [
    {
      position: [12, 3, 0] as [number, number, number],
      type: 'mushroom' as const,
    },
    {
      position: [22, 6, 0] as [number, number, number],
      type: 'fireFlower' as const,
    },
  ];

  // Enemy positions
  const enemyPositions: [number, number, number][] = [
    [15, 1, 0],
    [28, 1, 0],
    [33, 1, 0],
    [40, 1, 0],
  ];

  // Jump mechanics
  const jump = () => {
    if (isOnFloor.current && !jumpCooldown) {
      const jumpForce = marioState.size === 'small' ? 6 : 7;
      mario.current.applyImpulse({ x: 0, y: jumpForce, z: 0 }, true);
      isOnFloor.current = false;
      setJumpCooldown(true);
      setTimeout(() => setJumpCooldown(false), 200);
    }
  };

  // Ground pound
  const groundPound = () => {
    if (!isOnFloor.current && !marioState.isGroundPounding) {
      setMarioState({ ...marioState, isGroundPounding: true });
      mario.current.applyImpulse({ x: 0, y: -10, z: 0 }, true);
    }
  };

  // Movement handling (2.5D - only X-axis)
  const handleMovement = () => {
    const moveForce = marioState.isDucking ? 0.1 : 0.3;
    const maxSpeed = marioState.isDucking ? 2 : 5;

    const velocity = mario.current.linvel();

    if (rightPress && Math.abs(velocity.x) < maxSpeed) {
      mario.current.applyImpulse({ x: moveForce, y: 0, z: 0 }, true);
    }
    if (leftPress && Math.abs(velocity.x) < maxSpeed) {
      mario.current.applyImpulse({ x: -moveForce, y: 0, z: 0 }, true);
    }

    // Apply friction
    if (!leftPress && !rightPress) {
      mario.current.applyImpulse({ x: -velocity.x * 0.1, y: 0, z: 0 }, true);
    }
  };

  // Crouching
  useEffect(() => {
    if (crouchPress && isOnFloor.current && marioState.size !== 'small') {
      setMarioState({ ...marioState, isDucking: true });
    } else {
      setMarioState({ ...marioState, isDucking: false });
    }
  }, [crouchPress, marioState.size]);

  // Ground pound reset
  useEffect(() => {
    if (isOnFloor.current && marioState.isGroundPounding) {
      setMarioState({ ...marioState, isGroundPounding: false });
    }
  }, [isOnFloor.current]);

  // Coin collection
  const handleCoinCollect = () => {
    setScore(prev => prev + 100);
  };

  // PowerUp collection
  const handlePowerUpCollect = (newState: MarioState) => {
    setMarioState(newState);
    setScore(prev => prev + 1000);
  };

  // Enemy defeat
  const handleEnemyDefeat = () => {
    setScore(prev => prev + 200);
  };

  // Level completion
  const handleLevelComplete = () => {
    setLevelComplete(true);
    setScore(prev => prev + 5000);
  };

  // Side-scrolling camera follow
  useFrame(() => {
    if (mario.current) {
      const marioPosition = mario.current.translation();

      // Smooth camera follow on X-axis (side-scrolling)
      const targetCameraX = marioPosition.x + 5; // Camera follows behind Mario
      const currentCameraX = camera.position.x;
      const lerpedCameraX = THREE.MathUtils.lerp(
        currentCameraX,
        targetCameraX,
        0.05
      );

      // Keep Mario in view but allow some movement freedom
      camera.position.set(lerpedCameraX, 8, 8);
      camera.lookAt(marioPosition.x, marioPosition.y + 1, 0);

      // Handle jump input
      if (jumpPress) {
        if (crouchPress && !isOnFloor.current) {
          groundPound();
        } else {
          jump();
        }
      }

      // Handle movement
      handleMovement();
    }
  });

  return (
    <>
      <ambientLight intensity={0.8} />
      <directionalLight
        position={[10, 10, 5]}
        intensity={1}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />

      {/* UI Elements (Score, Lives, etc.) */}
      <group>{/* Score display could be added here as 3D text */}</group>

      {/* Character (Mario) */}
      <Character
        myref={mario}
        onFloor={isOnFloor}
        marioState={marioState}
        setMarioState={setMarioState}
      />

      {/* Map */}
      <Map />

      {/* Coins */}
      {coinPositions.map((position, index) => (
        <Coin
          key={`coin-${index}`}
          position={position}
          onCollect={handleCoinCollect}
        />
      ))}

      {/* PowerUps */}
      {powerUpPositions.map((powerUp, index) => (
        <PowerUp
          key={`powerup-${index}`}
          position={powerUp.position}
          type={powerUp.type}
          currentMarioState={marioState}
          onCollect={handlePowerUpCollect}
        />
      ))}

      {/* Enemies */}
      {enemyPositions.map((position, index) => (
        <Enemy
          key={`enemy-${index}`}
          position={position}
          onDefeat={handleEnemyDefeat}
        />
      ))}

      {/* Flag Pole (Level Goal) */}
      <FlagPole position={[45, 0, 0]} onReach={handleLevelComplete} />

      {/* Level Complete Message */}
      {levelComplete && (
        <group position={[45, 10, 0]}>
          {/* 3D text "LEVEL COMPLETE!" could be added here */}
        </group>
      )}
    </>
  );
}
