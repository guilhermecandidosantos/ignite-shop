import { styled } from '..';

export const Container = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  justifyContent: 'center',
  minHeight: '100vh'

});

export const Header = styled('header', {
  padding: '2rem 0',
  width: '100%',
  maxWidth: 1180,
  margin: '0 auto',
  display: 'flex',
  justifyContent:'space-between',
  alignItems: 'center',

  img: {
    cursor: 'pointer',
  }
});

export const ButtonCart = styled('button', {
  variants: {
    outlined: {
      false: {
        color: '$gray300',
        span: {
          display: 'none'
        }
      },
      true: {
        color: '$white'
      }
    }
  },

  padding: 12,
  borderRadius: 6,
  background: '$gray800',
  border: 'none',
  cursor: 'pointer',
  position: 'relative',

  span: {
    width: 24,
    height:24,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '$sm',
    color: '$white',
    backgroundColor: '$green500',
    border: '3px solid $gray900',
    borderRadius: '100%',
    position: 'absolute',
    top: 0,
    right: 0,
    transform: 'translate(30%, -30%)'
  },

});

export const CartContainer = styled('div', {
  height: '90%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',

  footer: {
    display: 'flex',
    flexDirection: 'column',

    div: {
      display: 'flex',
      justifyContent: 'space-between',
      gap: '0.5rem',
    },

    'div:first-child': {
      p: {
        color: '$gray300',
        lineHeight: 1.6
      },

      span: {
        color: '$gray300',
        lineHeight: 1.6
      }
    },

    'div:last-child': {
      p: {
        color: '$gray100',
        lineHeight: 1.6,
        fontWeight: 'bold',
      },

      span: {
        color: '$gray100',
        lineHeight: 1.6,
        fontWeight: 'bold',
      }
    },

    button: {
      padding: '1.5rem',
      background: '$green500',
      color: '$white',
      fontSize: '1.125rem',
      lineHeight: 1.6,
      fontWeight: 'bold',
      cursor: 'pointer',
      marginTop: '3rem',
      border: 'none',
      borderRadius: 8,

      '&:hover': {
        background: '$green300',

      }
    }
  }
});

export const ItensContainer = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: '1.5rem',
});

export const Item = styled('div', {
  display: 'flex',
  flexDirection: 'row',
  gap: '1.5rem',
});

export const ImageContainer = styled('div', {
  width: 100,
  height: 100,
  background: 'linear-gradient(180deg, #1ea483 0%, #7465d4 100%)',
  borderRadius: 8,
  padding: '0.25rem',
  display: 'flex',
  justifyContent: 'center',

  img: {
    width: 100,
    height: 100,
    objectFit: 'cover',
    borderRadius: 8
  }
});

export const ContentContainer = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'start',

  p: {
    fontSize: '$md',
    color: '$gray300',
  },

  span: {
    fontSize: '$md',
    fontWeight: 'bold',
    color: '$gray100',
    marginBottom: 8,
  },

  button: {
    border: 'none',
    background: 'transparent',
    color: '$green500',
    cursor: 'pointer',
    lineHeight: 1.6,

    '&:hover': {
      color: '$green300',
    }
  }
});