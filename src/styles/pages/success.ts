import { styled } from '..';

export const SuccessContainer = styled('main', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  margin: '0 auto',
  height: 656,

  h1: {
    fontSize: '$2xl',
    color: '$gray100',
  },

  p: {
    fontSize: '$xl',
    color: '$gray300',
    maxWidth: 560,
    textAlign: 'center',
    marginTop: '2rem',
    lineHeight: 1.4,
  },

  a: {
    display: 'block',
    marginTop: '5rem',
    fontSize: '$lg',
    color: '$green500',
    textDecoration: 'none',
    fontWeight: 'bold',

    '&:hover': {
      color: '$green300',
    }
  }
});

export const ImageContainer = styled('div', {
  display: 'flex',
  flexDirection: 'row',
});

export const ImageBackground = styled('div', {
  width: '100%',
  maxWidth: 130,
  height: 145,
  background: 'linear-gradient(180deg, #1ea483 0%, #7465d4 100%)',
  borderRadius: '100%',
  padding: '0.25rem',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginTop: '4rem',
  boxShadow: '0 0 60px 0 rgba(0,0,0,0.8)',

  '& + div': {
    marginLeft: '-3rem',
  },

  img: {
    objectFit: 'cover'
  },
});