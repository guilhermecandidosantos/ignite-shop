import { SkeletonContainer } from './styles';

interface SkeletonProps {
  width?: number | string
  height?: number | string
  count?: number
}

function Skeleton({ width = '100%', height = 16, count = 1 }: SkeletonProps) {
  return (
    <>
      {Array.from({ length: count }, (_, i) => (
        <SkeletonContainer key={i} css={{
          width,
          height
        }} />
      ))}
    </>
  );
}

export default Skeleton;