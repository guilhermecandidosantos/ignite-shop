import { keyframes, styled } from '../../styles';

// const pulse = keyframes({
//   '0%': {
//     backgroundColor: '#2a2a2a',
//     opacity: 0.1
//   },
//   '100%': {
//     backgroundColor: '#2a2a2a',
//     opacity: 1
//   }
// });

// export const SkeletonContainer = styled('div', {
//   width: '100%',
//   height: '20rem',
//   marginBottom: '0.5rem',
//   borderRadius: '0.25rem',
//   animation: `${pulse} 0.8s infinite alternate`,
// });

const skeleton = keyframes({
  to: {
    backgroundPositionX: '-200%',
  }
});

export const SkeletonContainer = styled('div', {
  width: '100%',
  backgroundColor: '#FFF',
  padding: 1,
  borderRadius: 4,
  backgroundImage: 'linear-gradient(110deg,#7e7b7b 8%,#9e9b9b 18%, #7e7b7b 33%)',
  height: 20,
  backgroundSize: '200% 100%',
  animation: `1s ${skeleton} linear infinite`,

  '& + div': {
    marginTop: '0.5rem'
  }
});