let n = 0;
let flag  =0;
function isPossible(k, arr, x, y) {
    // Check the x axis
    for (let i = 0; i < 9; i++) {
        if (arr[x][i] === k) {
            return false;
        }
    }
    
    // Check the y axis
    for (let i = 0; i < 9; i++) {
        if (arr[i][y] === k) {
            return false;
        }
    }
    
    // Check the 3x3 sub-grid
    const startRow = x - (x % 3);
    const startCol = y - (y % 3);
    
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (arr[startRow + i][startCol + j] === k) {
                return false;
            }
        }
    }
    
    return true;
}

function countblank(arr)
{
    let count = 0;
    for(let i = 0; i<9; i++)
    {
        for(let j = 0; j < 9; j++)
        {
            if(arr[i][j] === 0)
            {
                count++;
            }
        }
    }

    return count;

}

async function solvee(arr, blank, setPuz, setCopy)
{
    flag = 0;
    if(n === blank)
    {
        return;
    }

    for(let i = 0; i<9; i++)
    {
        for(let j = 0; j < 9; j++)
        {
            if(arr[i][j] === 0)
            {
                for(let k = 1; k<10; k++)
                {
                    if(isPossible(k, arr, i, j))
                    {
                        flag = 1;
                        arr[i][j] = k;
                        setCopy([...arr]);
                        setPuz([...arr]);
                        await new Promise(resolve => setTimeout(resolve, 25)); // Delay for visualization
                        n++;
                        await solvee(arr, blank, setPuz, setCopy);
                        if(n === blank)
                        {
                            return;
                        }
                        flag = 0;
                        arr[i][j] = 0;
                        setCopy([...arr]);
                        setPuz([...arr]);
                        await new Promise(resolve => setTimeout(resolve, 25)); // Delay for visualization
                        n--;
                    }
                }   
                if(flag === 0)
                {
                    return;
                }     
            }
        }
    }
}

export function solver(arr, puz, setPuz, setCopy)
{
    let blank = countblank(arr);
    solvee(arr, blank, puz, setPuz, setCopy);
}
