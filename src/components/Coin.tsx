import { Cylinder } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { RigidBody } from '@react-three/rapier';
import { useRef, useState } from 'react';
import * as THREE from 'three';

interface CoinProps {
  position: [number, number, number];
  onCollect: () => void;
}

export default function Coin({ position, onCollect }: CoinProps) {
  const coinRef = useRef<THREE.Group>(null!);
  const [collected, setCollected] = useState(false);

  useFrame((state, delta) => {
    if (coinRef.current && !collected) {
      // Rotate coin continuously
      coinRef.current.rotation.y += delta * 3;
      // Add floating animation
      coinRef.current.position.y =
        position[1] + Math.sin(state.clock.elapsedTime * 2) * 0.1;
    }
  });

  const handleCollision = ({ other }: any) => {
    if (other.rigidBodyObject?.name === 'mario' && !collected) {
      setCollected(true);
      onCollect();
    }
  };

  if (collected) return null;

  return (
    <RigidBody
      type="fixed"
      name="coin"
      position={position}
      sensor={true}
      onIntersectionEnter={handleCollision}
    >
      <group ref={coinRef}>
        <Cylinder
          args={[0.3, 0.3, 0.1]}
          material-color="#FFD700"
          rotation={[Math.PI / 2, 0, 0]}
        />
        {/* Inner ring for coin detail */}
        <Cylinder
          args={[0.15, 0.15, 0.12]}
          material-color="#FFA500"
          rotation={[Math.PI / 2, 0, 0]}
        />
      </group>
    </RigidBody>
  );
}
