import { Box, Sphere } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { RigidBody } from '@react-three/rapier';
import { useRef, useState } from 'react';
import * as THREE from 'three';
import { MarioState } from './Character';

interface PowerUpProps {
  position: [number, number, number];
  type: 'mushroom' | 'fireFlower';
  onCollect: (newState: MarioState) => void;
  currentMarioState: MarioState;
}

export default function PowerUp({
  position,
  type,
  onCollect,
  currentMarioState,
}: PowerUpProps) {
  const powerUpRef = useRef<THREE.Group>(null!);
  const [collected, setCollected] = useState(false);

  useFrame((state, delta) => {
    if (powerUpRef.current && !collected) {
      // Add floating animation
      powerUpRef.current.position.y =
        position[1] + Math.sin(state.clock.elapsedTime * 2) * 0.05;
    }
  });

  const handleCollision = ({ other }: any) => {
    if (other.rigidBodyObject?.name === 'mario' && !collected) {
      setCollected(true);

      let newState: MarioState;

      if (type === 'mushroom' && currentMarioState.size === 'small') {
        newState = { ...currentMarioState, size: 'super' };
      } else if (
        type === 'fireFlower' &&
        (currentMarioState.size === 'super' ||
          currentMarioState.size === 'small')
      ) {
        newState = { ...currentMarioState, size: 'fire' };
      } else {
        // If already powered up, just give points (future feature)
        newState = currentMarioState;
      }

      onCollect(newState);
    }
  };

  if (collected) return null;

  const getPowerUpColor = () => {
    return type === 'mushroom' ? '#FF0000' : '#FF4500';
  };

  const getPowerUpSecondaryColor = () => {
    return type === 'mushroom' ? '#FFFFFF' : '#FFFF00';
  };

  return (
    <RigidBody
      type="fixed"
      name="powerup"
      position={position}
      sensor={true}
      onIntersectionEnter={handleCollision}
    >
      <group ref={powerUpRef}>
        {type === 'mushroom' ? (
          <>
            {/* Mushroom stem */}
            <Box
              args={[0.3, 0.6, 0.3]}
              material-color="#FFFACD"
              position={[0, -0.2, 0]}
            />
            {/* Mushroom cap */}
            <Sphere
              args={[0.4]}
              material-color={getPowerUpColor()}
              position={[0, 0.2, 0]}
              scale={[1, 0.7, 1]}
            />
            {/* White spots on mushroom */}
            <Sphere
              args={[0.08]}
              material-color={getPowerUpSecondaryColor()}
              position={[-0.15, 0.3, 0.15]}
            />
            <Sphere
              args={[0.08]}
              material-color={getPowerUpSecondaryColor()}
              position={[0.15, 0.25, -0.1]}
            />
          </>
        ) : (
          <>
            {/* Fire Flower petals */}
            <Sphere
              args={[0.15]}
              material-color={getPowerUpColor()}
              position={[0.2, 0.2, 0]}
            />
            <Sphere
              args={[0.15]}
              material-color={getPowerUpColor()}
              position={[-0.2, 0.2, 0]}
            />
            <Sphere
              args={[0.15]}
              material-color={getPowerUpColor()}
              position={[0, 0.2, 0.2]}
            />
            <Sphere
              args={[0.15]}
              material-color={getPowerUpColor()}
              position={[0, 0.2, -0.2]}
            />
            {/* Fire Flower center */}
            <Sphere
              args={[0.12]}
              material-color={getPowerUpSecondaryColor()}
              position={[0, 0.2, 0]}
            />
            {/* Stem */}
            <Box
              args={[0.1, 0.4, 0.1]}
              material-color="#228B22"
              position={[0, -0.1, 0]}
            />
          </>
        )}
      </group>
    </RigidBody>
  );
}
