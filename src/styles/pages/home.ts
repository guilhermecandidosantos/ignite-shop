import Link from 'next/link';

import { styled } from '..';

export const HomeContainer = styled('main', {
  display: 'flex',
  width: '100%',
  maxWidth: 'calc(100vw - ((100vw - 1180px) /2))',
  marginLeft: 'auto',
  minHeight: 656,
  position: 'relative',
});

export const Product = styled(Link, {
  background: 'linear-gradient(180deg, #1ea483 0%, #7465d4 100%)',
  borderRadius: 8,
  cursor: 'pointer',
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  overflow: 'hidden',

  img: {
    objectFit: 'cover'
  },

  footer: {
    position: 'absolute',
    bottom: '0.25rem',
    left: '0.25rem',
    right: '0.25rem',
    padding: '2rem',
    
    borderRadius: 4,

    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',

    backgroundColor: 'rgba(0, 0, 0, 0.6)',

    '@sm': {
      transform: 'translateY(110%)',
      opacity: 0,
      transition: 'all 0.2s ease-in-out',
    },

    div: {
      display: 'flex',
      flexDirection: 'column',

      strong: {
        fontSize: '$lg',
        color: '$gray100'
      },

      span: {
        fontSize: '$xl',
        fontWeight: 'bold',
        color: '$green300'
      }
    }
  },

  '@sm': {
    '&:hover': {
      footer: {
        transform: 'translateY(0)',
        opacity: 1,
      }
    }
  }
});

export const ButtonBuy = styled('button', {
  padding: 12,
  borderRadius: 6,
  background: '$green500',
  border: 'none',
  color: '$white',
  cursor: 'pointer',

  '&:hover': {
    background: '$green300',
  }
});

const ButtonBase = styled('div', {
  height: '100%',
  width: 86,
  border: 'none',
  display: 'flex',
  alignItems: 'center',
  pointerEvents: 'none',

  '@smM': {
    width: 56
  }
});

export const ButtonLeft = styled(ButtonBase, {
  position: 'absolute',
  top: 0,
  left: 0,
  background: 'linear-gradient(90deg, #121214 0%, #12121405 100%)',
});

export const ButtonRight = styled(ButtonBase, {
  position: 'absolute',
  top: 0,
  right: 0,
  display: 'flex',
  justifyContent: 'end',
  background: 'linear-gradient(90deg, #12121405 0%, #121214 100%)',
});

export const Button = styled('button', {
  display: 'flex',
  alignItems: 'center',
  color: '$gray300',
  cursor: 'pointer',
  background: 'none',
  border: 'none',
  pointerEvents: 'visible',
  padding: 26,
  
});