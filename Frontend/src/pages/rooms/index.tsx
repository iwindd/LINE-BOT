import Masonry from '@mui/lab/Masonry';
import Paper from '@mui/material/Paper';
import { Item } from '../../components/3rd-party/masonry';

import Detail from './items/Detail';
import ShowItem from './items/ShowItem';

const heights: number[] = [300, 300];
const items: JSX.Element[] = [<ShowItem />, <Detail />];

function Synthia() {
    return (
        <Paper className='p-4 space-y-4' elevation={0}>
            <Masonry columns={2} spacing={2}>
                {heights.map((height, index) => (
                    <Item key={index} sx={{ height }}>
                        {items[index]}
                    </Item>
                ))}
            </Masonry>
        </Paper>
    )
}

export default Synthia