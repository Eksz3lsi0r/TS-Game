import { Box, Cylinder } from '@react-three/drei';
import { RigidBody } from '@react-three/rapier';

export default function Map() {
  return (
    <>
      {/* Ground/Floor - extends horizontally for side-scrolling */}
      <RigidBody type="fixed" name="floor" friction={1.5}>
        <Box
          position={[15, -0.5, 0]}
          args={[50, 1, 4]}
          material-color="#7CFC00"
        />
      </RigidBody>

      {/* Starting Platform */}
      <RigidBody type="fixed" name="platform" friction={1.5}>
        <Box position={[0, 0.5, 0]} args={[4, 1, 4]} material-color="#8B4513" />
      </RigidBody>

      {/* Pipes (Mario-style green pipes) */}
      <RigidBody type="fixed" name="pipe" friction={1.5}>
        <Cylinder
          position={[8, 1, 0]}
          args={[0.8, 0.8, 2]}
          material-color="#228B22"
        />
        <Box
          position={[8, 2.2, 0]}
          args={[1.2, 0.4, 1.2]}
          material-color="#228B22"
        />
      </RigidBody>

      {/* Another Pipe */}
      <RigidBody type="fixed" name="pipe" friction={1.5}>
        <Cylinder
          position={[25, 1.5, 0]}
          args={[0.8, 0.8, 3]}
          material-color="#228B22"
        />
        <Box
          position={[25, 3.2, 0]}
          args={[1.2, 0.4, 1.2]}
          material-color="#228B22"
        />
      </RigidBody>

      {/* Question Blocks */}
      <RigidBody type="fixed" name="block" friction={1.5}>
        <Box position={[12, 2, 0]} args={[1, 1, 1]} material-color="#FFD700" />
      </RigidBody>

      <RigidBody type="fixed" name="block" friction={1.5}>
        <Box position={[14, 2, 0]} args={[1, 1, 1]} material-color="#FFD700" />
      </RigidBody>

      <RigidBody type="fixed" name="block" friction={1.5}>
        <Box position={[16, 2, 0]} args={[1, 1, 1]} material-color="#FFD700" />
      </RigidBody>

      {/* Floating Platforms */}
      <RigidBody type="fixed" name="platform" friction={1.5}>
        <Box
          position={[20, 3, 0]}
          args={[3, 0.5, 2]}
          material-color="#8B4513"
        />
      </RigidBody>

      <RigidBody type="fixed" name="platform" friction={1.5}>
        <Box
          position={[30, 4, 0]}
          args={[3, 0.5, 2]}
          material-color="#8B4513"
        />
      </RigidBody>

      <RigidBody type="fixed" name="platform" friction={1.5}>
        <Box
          position={[35, 2, 0]}
          args={[3, 0.5, 2]}
          material-color="#8B4513"
        />
      </RigidBody>

      {/* Brick Blocks */}
      <RigidBody type="fixed" name="block" friction={1.5}>
        <Box position={[18, 4, 0]} args={[1, 1, 1]} material-color="#CD853F" />
      </RigidBody>

      <RigidBody type="fixed" name="block" friction={1.5}>
        <Box position={[22, 5, 0]} args={[1, 1, 1]} material-color="#CD853F" />
      </RigidBody>

      {/* End Goal Area */}
      <RigidBody type="fixed" name="platform" friction={1.5}>
        <Box
          position={[45, 0.5, 0]}
          args={[6, 1, 4]}
          material-color="#8B4513"
        />
      </RigidBody>

      {/* Castle Structure (simple) */}
      <RigidBody type="fixed" name="castle" friction={1.5}>
        <Box position={[45, 3, 0]} args={[4, 4, 3]} material-color="#696969" />
        {/* Castle towers */}
        <Box
          position={[43, 5.5, 0]}
          args={[1, 1, 1]}
          material-color="#696969"
        />
        <Box
          position={[47, 5.5, 0]}
          args={[1, 1, 1]}
          material-color="#696969"
        />
      </RigidBody>

      {/* Underground platforms */}
      <RigidBody type="fixed" name="platform" friction={1.5}>
        <Box
          position={[28, -2, 0]}
          args={[2, 0.5, 2]}
          material-color="#654321"
        />
      </RigidBody>

      {/* Walls to prevent falling off the level */}
      <RigidBody type="fixed" name="wall" friction={1.5}>
        <Box position={[-5, 2, 0]} args={[1, 4, 4]} material-color="#8B4513" />
      </RigidBody>

      <RigidBody type="fixed" name="wall" friction={1.5}>
        <Box position={[50, 2, 0]} args={[1, 4, 4]} material-color="#8B4513" />
      </RigidBody>
    </>
  );
}
