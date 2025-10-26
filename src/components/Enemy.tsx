import { Box, Sphere } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { RapierRigidBody, RigidBody } from '@react-three/rapier';
import { useRef, useState } from 'react';

interface EnemyProps {
  position: [number, number, number];
  onDefeat: () => void;
}

export default function Enemy({ position, onDefeat }: EnemyProps) {
  const enemyRef = useRef<RapierRigidBody>(null!);
  const [defeated, setDefeated] = useState(false);
  const [direction, setDirection] = useState(1); // 1 for right, -1 for left
  const [squashed, setSquashed] = useState(false);

  useFrame((state, delta) => {
    if (enemyRef.current && !defeated && !squashed) {
      // Move enemy back and forth
      const velocity = enemyRef.current.linvel();
      const maxSpeed = 1;

      // Apply movement force
      if (Math.abs(velocity.x) < maxSpeed) {
        enemyRef.current.applyImpulse({ x: direction * 0.1, y: 0, z: 0 }, true);
      }

      // Check if enemy should turn around (simple AI)
      const position = enemyRef.current.translation();
      if (position.x > 40 || position.x < 5) {
        setDirection(-direction);
      }
    }
  });

  const handleCollision = ({ other, manifold }: any) => {
    if (other.rigidBodyObject?.name === 'mario' && !defeated) {
      // Check if Mario is above the enemy (jumping on it)
      const normal = manifold.normal();
      if (normal.y > 0.5) {
        // Mario jumped on enemy from above
        setSquashed(true);
        setTimeout(() => {
          setDefeated(true);
          onDefeat();
        }, 500);
      } else {
        // Mario hit enemy from side - Mario should take damage
        // This would trigger Mario damage logic in the parent component
      }
    }

    // Turn around when hitting walls or platforms
    if (
      other.rigidBodyObject?.name === 'wall' ||
      other.rigidBodyObject?.name === 'pipe' ||
      other.rigidBodyObject?.name === 'block'
    ) {
      setDirection(-direction);
    }
  };

  if (defeated) return null;

  return (
    <RigidBody
      ref={enemyRef}
      type="dynamic"
      name="enemy"
      position={position}
      onCollisionEnter={handleCollision}
      lockRotations={true}
      linearDamping={0.5}
    >
      <group>
        {/* Goomba body */}
        <Box
          args={squashed ? [0.8, 0.2, 0.8] : [0.8, 0.6, 0.8]}
          material-color="#8B4513"
          position={[0, squashed ? -0.2 : 0, 0]}
        />

        {!squashed && (
          <>
            {/* Goomba eyes */}
            <Sphere
              args={[0.08]}
              material-color="#000000"
              position={[-0.15, 0.15, 0.35]}
            />
            <Sphere
              args={[0.08]}
              material-color="#000000"
              position={[0.15, 0.15, 0.35]}
            />

            {/* Goomba eyebrows (angry look) */}
            <Box
              args={[0.2, 0.05, 0.05]}
              material-color="#000000"
              position={[-0.15, 0.25, 0.37]}
              rotation={[0, 0, -0.3]}
            />
            <Box
              args={[0.2, 0.05, 0.05]}
              material-color="#000000"
              position={[0.15, 0.25, 0.37]}
              rotation={[0, 0, 0.3]}
            />

            {/* Goomba feet */}
            <Box
              args={[0.15, 0.1, 0.2]}
              material-color="#654321"
              position={[-0.25, -0.35, 0]}
            />
            <Box
              args={[0.15, 0.1, 0.2]}
              material-color="#654321"
              position={[0.25, -0.35, 0]}
            />
          </>
        )}
      </group>
    </RigidBody>
  );
}
