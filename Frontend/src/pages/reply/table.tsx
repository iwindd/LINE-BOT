import { Typography, Box } from '@mui/material';
import { DataGrid, GridColDef, GridRowsProp } from '@mui/x-data-grid';

const columns: GridColDef[] = [
    { field: 'id', headerName: 'reply.table.header.num', flex: 1 },
    { field: 'name', headerName: 'reply.table.header.name', flex: 1 },
    { field: 'used', headerName: 'reply.table.header.used', flex: 1 },
    { field: 'created_at', headerName: 'reply.table.header.created_at', flex: 1 }
];

const rows: GridRowsProp = [
    { id: 1, name: 'Hello', used: 0, created_at: (new Date()) },
    { id: 2, name: 'DataGridPro', used: 0, created_at: (new Date()) },
    { id: 3, name: 'MUI', used: 0, created_at: (new Date()) }
];

export default function Table() {
    return (
        <Box className="h-screen">
            <div className="grid lg:grid-cols-2 md:grid-cols-1 gap-2 h-full">
                <div className='h-3/4'><DataGrid rows={rows} columns={columns} /></div>
                <div><Typography>Command Name</Typography></div>
            </div>
        </Box>
    );
}
