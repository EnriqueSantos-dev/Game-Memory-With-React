import { useEffect, useState } from 'react';
import * as C from './AppStyles';

import Logo from './assets/devmemory_logo.png';
import RestartIcon from './assets/svgs/restart.svg';

import { TypeGridItem } from './Types/TypeGridItem';
import { itemList } from './data/itemsList';

import { InfoItem } from './components/InfoItem';
import { Button } from './components/Button/index';
import { GridItem } from './components/GridItem';
import { FormatTimeElapsed } from './helpers/FormatTimeElapsed';

function App() {
  const [playing, setPlaying] = useState<boolean>(false);
  const [timeElapsed, setTimeElapsed] = useState<number>(0);
  const [moveCount, setMoveCount] = useState<number>(0);
  const [shownCount, setShownCount] = useState<number>(0);
  const [gridItems, setGridItems] = useState<TypeGridItem[]>([]);

  useEffect(() => resetAndCreateGrid(), []);

  useEffect(() => {
    const timer = setInterval(() => {
      if (playing) {
        setTimeElapsed(timeElapsed + 1);
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [playing, timeElapsed]);

  // verificar se os items abertos são iguais
  useEffect(() => {
    if (shownCount === 2) {
      let opened = gridItems.filter(item => item.shown === true);
      let tempGrid = [...gridItems];
      if (opened.length === 2) {
        let tempGrid = [...gridItems];
        if (opened[0].item === opened[1].item) {
          for (let i in tempGrid) {
            if (tempGrid[i].shown) {
              tempGrid[i].permanentShow = true;
              tempGrid[i].shown = false;
            }
          }
          setGridItems(tempGrid);
          setShownCount(0);
          setMoveCount(moveCount + 1);
        } else {
          let tempGrid = [...gridItems];
          setTimeout(() => {
            for (let i in tempGrid) {
              tempGrid[i].shown = false;
            }
            setGridItems(tempGrid);
            setShownCount(0);
            setMoveCount(moveCount + 1);
          }, 1000);
        }
      }
    }
  }, [shownCount, gridItems]);

  useEffect(() => {
    if (moveCount > 0 && gridItems.every(item => item.permanentShow === true)) {
      setPlaying(false);
    }
  }, [moveCount, gridItems]);

  function resetAndCreateGrid() {
    // Passo  - 1
    // Limpar as states para zerar o jogo
    setTimeElapsed(0);
    setMoveCount(0);
    setShownCount(0);

    // Passo - 2
    // Criar o grid

    // Passo 2.1 - criar grid vazio
    let tempGrid: TypeGridItem[] = [];
    for (let i = 0; i < itemList.length * 2; i++) {
      tempGrid.push({ item: null, shown: false, permanentShow: false });
    }
    // 2.2 preencher o grid
    for (let w = 0; w < 2; w++) {
      for (let i = 0; i < itemList.length; i++) {
        let pos = -1;
        while (pos < 0 || tempGrid[pos].item !== null) {
          pos = Math.floor(Math.random() * (itemList.length * 2));
        }
        tempGrid[pos].item = i;
      }
    }
    // 2.3 jogar no state
    setGridItems(tempGrid);
    setPlaying(true);
    // setGridItems([]);
  }

  function handleItemClick(index: number) {
    if (playing && index !== null && shownCount < 2) {
      let tempGrid = [...gridItems];
      if (
        tempGrid[index].shown === false &&
        tempGrid[index].permanentShow == false
      ) {
        tempGrid[index].shown = true;
        setShownCount(shownCount + 1);
      }

      setGridItems(tempGrid);
    }
  }

  return (
    <C.Container>
      <C.Info>
        <C.LogoLink>
          <img src={Logo} alt='Logo' width={200}></img>
        </C.LogoLink>
        <C.InfoArea>
          <InfoItem label='Tempo' value={FormatTimeElapsed(timeElapsed)} />
          <InfoItem label='Movimentos' value={moveCount.toString()} />
        </C.InfoArea>
        <Button
          label='Reiniciar'
          icon={RestartIcon}
          onClick={resetAndCreateGrid}
        />
      </C.Info>
      <C.GridArea>
        <C.Grid>
          {gridItems.map((item, key) => (
            <GridItem
              key={key}
              item={item}
              onClick={() => handleItemClick(key)}
            />
          ))}
        </C.Grid>
      </C.GridArea>
    </C.Container>
  );
}

export default App;
