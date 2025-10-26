import { Box, Sphere } from '@react-three/drei';
import { RapierRigidBody, RigidBody } from '@react-three/rapier';
import { MutableRefObject } from 'react';

interface MarioState {
  size: 'small' | 'super' | 'fire';
  isDucking: boolean;
  isGroundPounding: boolean;
}

export default function Character({
  myref,
  onFloor,
  marioState,
  setMarioState,
}: Readonly<{
  myref: MutableRefObject<RapierRigidBody>;
  onFloor: MutableRefObject<boolean>;
  marioState: MarioState;
  setMarioState: (state: MarioState) => void;
}>) {
  // Mario size based on power-up state
  const getCharacterSize = () => {
    if (marioState.isDucking) {
      return marioState.size === 'small' ? [0.8, 0.4, 0.8] : [0.8, 0.6, 0.8];
    }
    switch (marioState.size) {
      case 'small':
        return [0.8, 0.8, 0.8];
      case 'super':
        return [0.8, 1.6, 0.8];
      case 'fire':
        return [0.8, 1.6, 0.8];
      default:
        return [0.8, 0.8, 0.8];
    }
  };

  // Mario color based on power-up state
  const getCharacterColor = () => {
    switch (marioState.size) {
      case 'small':
        return '#8B4513'; // Brown
      case 'super':
        return '#FF0000'; // Red
      case 'fire':
        return '#FF4500'; // Orange-Red
      default:
        return '#8B4513';
    }
  };

  const characterSize = getCharacterSize();
  const characterColor = getCharacterColor();

  return (
    <>
      <RigidBody
        position={[0, 2, 0]} // Start Mario at the beginning of the level
        ref={myref}
        name="mario"
        onCollisionEnter={({ other }) => {
          if (
            other.rigidBodyObject?.name === 'floor' ||
            other.rigidBodyObject?.name === 'platform' ||
            other.rigidBodyObject?.name === 'pipe' ||
            other.rigidBodyObject?.name === 'block'
          ) {
            onFloor.current = true;
          }
        }}
        onCollisionExit={({ other }) => {
          if (
            other.rigidBodyObject?.name === 'floor' ||
            other.rigidBodyObject?.name === 'platform' ||
            other.rigidBodyObject?.name === 'pipe' ||
            other.rigidBodyObject?.name === 'block'
          ) {
            onFloor.current = false;
          }
        }}
        lockRotations={true}
        linearDamping={0.5}
        angularDamping={0.5}
      >
        {/* Mario Body */}
        <Box
          args={characterSize as [number, number, number]}
          material-color={characterColor}
        />

        {/* Mario Hat (only for super and fire Mario) */}
        {marioState.size !== 'small' && !marioState.isDucking && (
          <Box
            position={[0, characterSize[1] / 2 + 0.1, 0]}
            args={[0.6, 0.2, 0.6]}
            material-color="#FF0000"
          />
        )}

        {/* Mario Eyes */}
        <Sphere
          position={[-0.15, characterSize[1] / 4, 0.35]}
          args={[0.08]}
          material-color="#000000"
        />
        <Sphere
          position={[0.15, characterSize[1] / 4, 0.35]}
          args={[0.08]}
          material-color="#000000"
        />

        {/* Mario Mustache */}
        <Box
          position={[0, 0, 0.4]}
          args={[0.3, 0.1, 0.05]}
          material-color="#000000"
        />
      </RigidBody>
    </>
  );
}

export type { MarioState };
