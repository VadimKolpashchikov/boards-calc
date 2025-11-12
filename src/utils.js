 // Функция расчета оптимального раскроя досок
export function calculateOptimalCut(baseBoardSize, items) {
    // Сортируем изделия по убыванию размера
    const sortedItems = [...items].sort((a, b) => b.size - a.size);

    let usedBoards = []; // массив используемых досок

    // Проходим по каждому типу изделия столько раз, сколько его надо произвести
    for (let item of sortedItems) {
        for (let j = 0; j < item.quantity; j++) {
            let placed = false;
            
            // Пробуем поместить изделие на одну из уже занятых досок
            for (let i = 0; i < usedBoards.length && !placed; i++) {
                if (usedBoards[i].remaining >= item.size) { // Проверяем, достаточно ли места
                    usedBoards[i].remaining -= item.size;
                    usedBoards[i].used.push({name: item.name, size: item.size});
                    placed = true;
                }
            }
            
            // Если не смогли найти место, добавляем новую доску
            if (!placed) {
                usedBoards.push({
                    remaining: baseBoardSize - item.size,
                    used: [{name: item.name, size: item.size}]
                });
            }
        }
    }

    // Форматируем итоговую статистику
    return usedBoards.map(board => ({
        boardUsage: baseBoardSize - board.remaining,
        waste: board.remaining,
        itemsOnBoard: board.used.map(i => `${i.name}(${i.size}см)`).join(', ')
    }));
  }