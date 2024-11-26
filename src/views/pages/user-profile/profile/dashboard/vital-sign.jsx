'use client'

// React Imports
import { useState, useMemo } from 'react'

// MUI Imports
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import TablePagination from '@mui/material/TablePagination'
import Typography from '@mui/material/Typography'
import Checkbox from '@mui/material/Checkbox'
import IconButton from '@mui/material/IconButton'
import Modal from '@mui/material/Modal'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button' 

// Third-party Imports
import classnames from 'classnames'
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFacetedMinMaxValues,
  getPaginationRowModel,
  getSortedRowModel
} from '@tanstack/react-table'
import { useSession } from 'next-auth/react'
import axios from 'axios';

// Style Imports
import tableStyles from '@core/styles/table.module.css'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

// Format the date into 'MM/DD/YYYY HH:mm:ss'
const formattedDate = (date) => {return `${String(date.getMonth() + 1).padStart(2, '0')}/${String(date.getDate()).padStart(2, '0')}/${date.getFullYear()} ${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}:${String(date.getSeconds()).padStart(2, '0')}`};

// insert date format YYYY-MM-dd
const formatDate = (date) => {
  const pad = (num) => String(num).padStart(2, '0');

  const year = date.getFullYear();
  const month = pad(date.getMonth() + 1); // Months are zero-based
  const day = pad(date.getDate());
  const hours = pad(date.getHours());
  const minutes = pad(date.getMinutes());
  const seconds = pad(date.getSeconds());

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

const fuzzyFilter = (row, columnId, value, addMeta) => {
  // Rank the item
  const itemRank = rankItem(row.getValue(columnId), value)

  // Store the itemRank info
  addMeta({
    itemRank
  })

  // Return if the item should be filtered in/out
  return itemRank.passed
}

// Column Definitions
const columnHelper = createColumnHelper()

const vitalSignParams = {
  user_id: '',
  date_taken: '',
  taken_by: '',
  temperature: '',
  heart_rate: '',
  blood_pressure: '',
  glucose_levels: ''
}


const VitalSign = ({ VitalSignResponseData }) => {
  // States
  const { data: session, status } = useSession()
  const [rowSelection, setRowSelection] = useState({})
  const [open, setOpen] = useState(false);
  const [data, setData] = useState(...[VitalSignResponseData])
  const [attributes, setAttributes] = useState(vitalSignParams)
  const [candidate, setCandidate] = useState(JSON.parse(JSON.stringify(attributes)));

  const handleClose = () => setOpen(false);

  const handleSave = async () => {
    candidate.user_id = session.user.id;
    candidate.date_taken = formatDate(new Date(candidate.date_taken));
    const response = await axios.put(`/api/pages/profile/vitalsign`, candidate);
    if (response.status != 200) {
      alert(`Can't update user information, please contact administrator.`);
    }

    setAttributes(candidate);

    setOpen(false);

    // Force refresh the page
    window.location.reload();
  };

  const handleEdit = row => {
    setAttributes(row);
    setCandidate(row);
    setOpen(true);
  }

  const handleDelete = row => {
    if (window.confirm(`Are you sure you want to delete?`)) {
      // send DELETE request to modify DB
      setData(prev => prev.filter(item => item.date_taken !== row.date_taken))
    }
  }

  const columns = useMemo(
    () => [
      {
        id: 'select',
        header: ({ table }) => (
          <Checkbox
            {...{
              checked: table.getIsAllRowsSelected(),
              indeterminate: table.getIsSomeRowsSelected(),
              onChange: table.getToggleAllRowsSelectedHandler()
            }}
          />
        ),
        cell: ({ row }) => (
          <Checkbox
            {...{
              checked: row.getIsSelected(),
              disabled: !row.getCanSelect(),
              indeterminate: row.getIsSomeSelected(),
              onChange: row.getToggleSelectedHandler()
            }}
          />
        )
      },
      columnHelper.accessor('modify', {
        id: 'modify',
        header: 'Modification',
        cell: ({ row }) => 
        <>
          <Typography align='center'>
          <IconButton size='small' onClick={() => handleEdit(row.original)}>
            <i className='ri-edit-box-line text-textSecondary' />
          </IconButton>
          <IconButton size='small' onClick={() => handleDelete(row.original)}>
            <i className='ri-delete-bin-7-line text-textSecondary' />
          </IconButton>
          </Typography>
        </>
      }),
      columnHelper.accessor('date_taken', {
        header: 'Date Taken',
        cell: ({ row }) => <Typography align='center'>{`${formattedDate(new Date(row.original.date_taken))}`}</Typography>
      }),
      columnHelper.accessor('taken_by', {
        header: 'Taken By',
        cell: ({ row }) => <Typography align='center'>{`${row.original.taken_by}`}</Typography>
      }),
      columnHelper.accessor('temperature', {
        header: 'Temperature',
        cell: ({ row }) => <Typography align='center'>{`${row.original.temperature}`}</Typography>
      }),
      columnHelper.accessor('heart_rate', {
        header: 'Heart Rate',
        cell: ({ row }) => <Typography align='center'>{`${row.original.heart_rate}`}</Typography>
      }),
      columnHelper.accessor('blood_pressure', {
        header: 'Blood Pressure',
        cell: ({ row }) => <Typography align='center'>{`${row.original.blood_pressure}`}</Typography>
      }),
      columnHelper.accessor('glucose_levels', {
        header: 'Glucose Levels',
        cell: ({ row }) => <Typography align='center'>{`${row.original.glucose_levels}`}</Typography>
      })
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  )


  const table = useReactTable({
    data: data,
    columns,
    filterFns: {
      fuzzy: fuzzyFilter
    },
    state: {
      rowSelection
    },
    initialState: {
      sorting: [{ id: 'date_taken', desc: true }],
      pagination: {
        pageSize: 5
      }
    },
    enableRowSelection: true, //enable row selection for all rows
    // enableRowSelection: row => row.original.age > 18, // or enable row selection conditionally per row
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getFacetedMinMaxValues: getFacetedMinMaxValues()
  })

  return (
    <>
      <Card>
        <CardHeader title='Vital sign History' subheader=''/>
        <div className='overflow-x-auto'>
          <table className={tableStyles.table}>
            <thead>
              {table.getHeaderGroups().map(headerGroup => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map(header => (
                    <th key={header.id}>
                      {header.isPlaceholder ? null : (
                        <>
                          <div
                            className={classnames({
                              'flex items-center': header.column.getIsSorted(),
                              'cursor-pointer select-none': header.column.getCanSort()
                            })}
                            onClick={header.column.getToggleSortingHandler()}
                          >
                            {flexRender(header.column.columnDef.header, header.getContext())}
                            {{
                              asc: <i className='ri-arrow-up-s-line text-xl' />,
                              desc: <i className='ri-arrow-down-s-line text-xl' />
                            }[header.column.getIsSorted()] ?? null}
                          </div>
                        </>
                      )}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            {table.getFilteredRowModel().rows.length === 0 ? (
              <tbody>
                <tr>
                  <td colSpan={table.getVisibleFlatColumns().length} className='text-center'>
                    No data available
                  </td>
                </tr>
              </tbody>
            ) : (
              <tbody>
                {table
                  .getRowModel()
                  .rows.slice(0, table.getState().pagination.pageSize)
                  .map(row => {
                    return (
                      <tr key={row.id} className={classnames({ selected: row.getIsSelected() })}>
                        {row.getVisibleCells().map(cell => (
                          <td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
                        ))}
                      </tr>
                    )
                  })}
              </tbody>
            )}
          </table>
        </div>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component='div'
          className='border-bs'
          count={table.getExpandedRowModel().rows.length}
          rowsPerPage={table.getState().pagination.pageSize}
          page={table.getState().pagination.pageIndex}
          onPageChange={(_, page) => {
            table.setPageIndex(page)
          }}
          onRowsPerPageChange={e => table.setPageSize(Number(e.target.value))}
        />
      </Card>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <TextField
            fullWidth
            disabled
            label="Date taken"
            id="filled-hidden-label-small"
            defaultValue={formatDate(new Date(attributes.date_taken))}
            onChange={event => candidate.date_taken = formatDate(new Date(event.target.value))}
            variant="filled"
            size="small"
          />
          <TextField
            fullWidth
            label="Taken by"
            id="filled-hidden-label-small"
            defaultValue={attributes.taken_by}
            onChange={event => candidate.taken_by = event.target.value}
            variant="filled"
            size="small"
          />
          <TextField
            fullWidth
            label="Temperature"
            id="filled-hidden-label-small"
            defaultValue={attributes.temperature}
            onChange={event => candidate.temperature = event.target.value}
            variant="filled"
            size="small"
          />
          <TextField
            fullWidth
            label="Heart rate"
            id="filled-hidden-label-small"
            defaultValue={attributes.heart_rate}
            onChange={event => candidate.heart_rate = event.target.value}
            variant="filled"
            size="small"
          />
          <TextField
            fullWidth
            label="Blood pressure"
            id="filled-hidden-label-small"
            defaultValue={attributes.blood_pressure}
            onChange={event => candidate.blood_pressure = event.target.value}
            variant="filled"
            size="small"
          />
          <TextField
            fullWidth
            label="Glucose levels"
            id="filled-hidden-label-small"
            defaultValue={attributes.glucose_levels}
            onChange={event => candidate.glucose_levels = event.target.value}
            variant="filled"
            size="small"
          /> 
          <Button onClick={handleSave}>Save</Button>
          <Button onClick={handleClose}>Cancel</Button>
        </Box>
      </Modal>
    </>
  )
}

export default VitalSign
