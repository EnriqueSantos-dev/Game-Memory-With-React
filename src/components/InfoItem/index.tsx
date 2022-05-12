import * as C from './styles';

interface InfoItemTypeProps {
  label: string;
  value: string;
}
export function InfoItem({ label, value }: InfoItemTypeProps) {
  return (
    <C.Container>
      <C.Label>{label}</C.Label>
      <C.Value>{value}</C.Value>
    </C.Container>
  );
}
