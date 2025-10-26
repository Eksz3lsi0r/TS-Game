import { Box, Cylinder } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { RigidBody } from '@react-three/rapier';
import { useRef, useState } from 'react';
import * as THREE from 'three';

interface FlagPoleProps {
  position: [number, number, number];
  onReach: () => void;
}

export default function FlagPole({ position, onReach }: FlagPoleProps) {
  const flagRef = useRef<THREE.Group>(null!);
  const [reached, setReached] = useState(false);

  useFrame((state, delta) => {
    if (flagRef.current) {
      // Make flag wave in the wind
      flagRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 2) * 0.1;
    }
  });

  const handleCollision = ({ other }: any) => {
    if (other.rigidBodyObject?.name === 'mario' && !reached) {
      setReached(true);
      onReach();
    }
  };

  return (
    <group position={position}>
      {/* Flag Pole */}
      <RigidBody type="fixed" name="flagpole">
        <Cylinder
          args={[0.1, 0.1, 8]}
          material-color="#654321"
          position={[0, 4, 0]}
        />
      </RigidBody>

      {/* Flag */}
      <RigidBody
        type="fixed"
        name="flag"
        sensor={true}
        onIntersectionEnter={handleCollision}
      >
        <group ref={flagRef} position={[0.5, 6, 0]}>
          <Box
            args={[1.5, 1, 0.1]}
            material-color={reached ? '#00FF00' : '#FF0000'}
          />
          {/* Flag pattern (simple stripes) */}
          <Box
            args={[1.5, 0.2, 0.11]}
            material-color="#FFFFFF"
            position={[0, 0.2, 0]}
          />
          <Box
            args={[1.5, 0.2, 0.11]}
            material-color="#FFFFFF"
            position={[0, -0.2, 0]}
          />
        </group>
      </RigidBody>

      {/* Flag Pole Base */}
      <RigidBody type="fixed" name="flagbase">
        <Box
          args={[0.5, 0.5, 0.5]}
          material-color="#654321"
          position={[0, 0.25, 0]}
        />
      </RigidBody>

      {/* Victory text (appears when reached) */}
      {reached && (
        <group position={[0, 8, 0]}>{/* Could add 3D text here later */}</group>
      )}
    </group>
  );
}
