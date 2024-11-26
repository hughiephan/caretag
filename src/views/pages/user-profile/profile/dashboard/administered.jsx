'use client'

// React Imports
import { useState, useMemo } from 'react'

// MUI Imports
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import Checkbox from '@mui/material/Checkbox' 
import Button from '@mui/material/Button' 
import Typography from '@mui/material/Typography'
import TablePagination from '@mui/material/TablePagination'
import Modal from '@mui/material/Modal'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton'

// Third-party Imports
import classnames from 'classnames'
import { rankItem } from '@tanstack/match-sorter-utils'
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

// Components Imports
import OptionMenu from '@core/components/option-menu'

// Style Imports
import tableStyles from '@core/styles/table.module.css'

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

const administeredParams = {
  administered_id: '',
  medication_name: '',
  user_id: '',
  date_administered: '',
  end_date: '',
  dosage: '',
  effectiveness_name: '',
  side_effects: '',
  frequency_name: ''
}

// Column Definitions
const columnHelper = createColumnHelper()

const AdministeredTable = ({ administered }) => {
  // States
  const [rowSelection, setRowSelection] = useState({})
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const fakeData = [{
    administered_id: 3,
    medication_name: 'Ciprofloxacin',
    user_id: 1,
    date_administered: '2024-10-31T16:00:00.000Z',
    end_date: '2024-11-29T16:00:00.000Z',
    dosage: 10,
    effectiveness_name: 'Medium',
    side_effects: 'Nausea',
    frequency_name: 'Daily'
  }]

  const [data, setData] = useState(...[administered])
  const [attributes, setAttributes] = useState(administeredParams)

  const handleEdit = row => {
    setAttributes(row);
    setOpen(true);
  }
  
  const handleDelete = row => {
    if (window.confirm(`Are you sure you want to delete ${row.name}?`)) {
      // send DELETE request to modify DB
      setData(prev => prev.filter(item => item.name !== row.name && item.date_diagnosed !== row.date_diagnosed))
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
      columnHelper.accessor('date_administered', {
        header: 'Date Administered',
        cell: ({ row }) => (
            <Typography align='center'>{`${row.original.date_administered}`}</Typography>
        )
      }),
      columnHelper.accessor('medication_name', {
        header: 'Medication Name',
        cell: ({ row }) => <Typography align='center'>{`${row.original.medication_name}`}</Typography>
      }),
      columnHelper.accessor('end_date', {
        header: 'End Date',
        cell: ({ row }) => <Typography align='center'>{`${row.original.end_date}`}</Typography>
      }),
      columnHelper.accessor('dosage', {
        header: 'Dosage',
        cell: ({ row }) => <Typography align='center'>{`${row.original.dosage}`}</Typography>
      }),
      columnHelper.accessor('effectiveness_name', {
        header: 'Effectiveness Name',
        cell: ({ row }) => <Typography align='center'>{`${row.original.effectiveness_name}`}</Typography>
      }),
      columnHelper.accessor('side_effects', {
        header: 'Side Effects',
        cell: ({ row }) => <Typography align='center'>{`${row.original.side_effects}`}</Typography>
      }),
      columnHelper.accessor('frequency_name', {
        header: 'Frequency Name',
        cell: ({ row }) => <Typography align='center'>{`${row.original.frequency_name}`}</Typography>
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
      sorting: [{ id: 'date_administered', desc: true }],
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
        <CardHeader title='Administered History' action={<OptionMenu options={['Refresh', 'Update', 'Share']} />} />
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
          <div>
          <TextField
            fullWidth
            label="Name"
            id="filled-hidden-label-small"
            defaultValue={attributes.name}
            variant="filled"
            size="small"
          />
          <TextField
            fullWidth
            label="Category"
            id="filled-hidden-label-small"
            defaultValue={attributes.category}
            variant="filled"
            size="small"
          />
          <TextField
            fullWidth
            label="Common Symptoms"
            id="filled-hidden-label-small"
            defaultValue={attributes.commonSymptoms}
            variant="filled"
            size="small"
          />
          <TextField
            fullWidth
            label="Description"
            id="filled-hidden-label-small"
            defaultValue={attributes.description}
            variant="filled"
            size="small"
          />
          <TextField
            fullWidth
            label="Symptoms"
            id="filled-hidden-label-small"
            defaultValue={attributes.symptoms}
            variant="filled"
            size="small"
          />
          <TextField
            fullWidth
            label="Serverity"
            id="filled-hidden-label-small"
            defaultValue={attributes.serverity}
            variant="filled"
            size="small"
          />
          <TextField
            fullWidth
            label="Date Diagnosed"
            id="filled-hidden-label-small"
            defaultValue={attributes.dateDiagnosed}
            variant="filled"
            size="small"
          />
          <TextField
            fullWidth
            label="Notes"
            id="filled-hidden-label-small"
            defaultValue={attributes.notes}
            variant="filled"
            size="small"
          />            
          </div>
          <Button onClick={handleClose}>Save</Button>
          <Button onClick={handleClose}>Cancel</Button>
        </Box>
      </Modal>
    </>
  )
}

export default AdministeredTable