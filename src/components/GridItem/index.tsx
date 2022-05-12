import { TypeGridItem } from '../../Types/TypeGridItem';
import * as C from './styles';
import b7websvg from '../../assets/svgs/b7.svg';
import { itemList } from '../../data/itemsList';

type GridItemProps = {
  item: TypeGridItem;
  onClick: () => void;
};
export function GridItem({ item, onClick }: GridItemProps) {
  return (
    <C.Container
      showBackgroundColor={item.permanentShow || item.shown}
      onClick={onClick}>
      {!item.permanentShow && !item.shown && (
        <C.Icon src={b7websvg} opacity={0.1} />
      )}
      {(item.permanentShow || item.shown) && item.item !== null && (
        <C.Icon src={itemList[item.item].icon} />
      )}
    </C.Container>
  );
}
