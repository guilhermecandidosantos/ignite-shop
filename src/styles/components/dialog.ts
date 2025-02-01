import * as DialogRadix from '@radix-ui/react-dialog';
import { styled } from '@stitches/react';

export const DialogRadixOverlay = styled(DialogRadix.Overlay, {
  overflow: 'hidden',
});

export const DialogRadixContent = styled(DialogRadix.Content, {
  position: 'fixed',
  top: 0,
  right: 0,
  height: '100vh',
  padding: '72px 48px 48px 48px',
  background: '$gray800',
  boxShadow: '-4px 0 30px black',
  overflowY: 'auto',
});

export const DialogRadixClose = styled(DialogRadix.Close, {
  position: 'absolute',
  top: 24,
  right: 24,
  border: 'none',
  background: 'transparent',
  color: '$gray700',
  cursor: 'pointer'
});

export const DialogRadixTitle = styled(DialogRadix.Title, {
  fontSize: '$md',
  marginBottom: '2rem',
});