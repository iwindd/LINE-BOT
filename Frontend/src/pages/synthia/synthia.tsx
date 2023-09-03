import Masonry from '@mui/lab/Masonry';
import Paper from '@mui/material/Paper';
import { Item } from '../../components/3rd-party/masonry';

import Config from './items/config';

const heights : number[]      = [300];
const items   : JSX.Element[] = [<Config/>];

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