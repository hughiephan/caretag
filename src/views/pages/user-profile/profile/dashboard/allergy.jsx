'use client'

// React Imports
import { useState, useMemo } from 'react'

// Next Imports 
import { useParams } from 'next/navigation'

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
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

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
import { useSession } from 'next-auth/react'
import axios from 'axios';

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

// insert date format YYYY-MM-dd
const formatDate = (date) => {
  const pad = (num) => String(num).padStart(2, '0');

  const year = date.getFullYear();
  const month = pad(date.getMonth() + 1); // Months are zero-based
  const day = pad(date.getDate());

  return `${year}-${month}-${day}`;
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

const allergyParams = {
  allergy_name: '',
  category_name: '',
  common_symptoms: '',
  description: '',
  symptoms: '',
  severity_name: 0,
  date_diagnosed: '',
  notes: ''
}

// Column Definitions
const columnHelper = createColumnHelper()

const AllergyTable = ({ allergies, userId }) => {
  // States
  const { data: session, status } = useSession()
  const [rowSelection, setRowSelection] = useState({})
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleSave = async () => {
    const res = await axios.get(`/api/pages/profile/allergy`);
    const allergyList = res.data;
    console.log(attributes.allergy_name);
    console.log(candidate.allergy_name)
    let doInsert = false;
    allergyList.forEach((allergy)=>{ 
        if (allergy.allergy_name===candidate.allergy_name) {
            doInsert = true;
            candidate.allergy_id = allergy.allergy_id;
            delete candidate.allergy_name
        }
    })

    if (!doInsert) {
        alert("Allergy name does not match to database, please change Allergy name.");
        return;
    }
    if (status != "authenticated") {
      console.log('missing user id to update bmi')
      return;
    }
    candidate.user_id = session.user.id;
    candidate.date_diagnosed = formatDate(new Date(candidate.date_diagnosed));
    // delete for simplicity
    delete candidate.category_name;
    delete candidate.common_symptoms
    delete candidate.description
    console.log(candidate)
    const response = await axios.put(`/api/pages/profile/allergy`, candidate);
    if (response.status != 200) {
      alert(`Can't update user information, please contact administrator.`);
    }

    setAttributes(candidate);

    setOpen(false);

    // Force refresh the page
    window.location.reload();
  };
  
  const [data, setData] = useState(...[allergies])
  const [attributes, setAttributes] = useState(allergyParams)
  const [candidate, setCandidate] = useState(JSON.parse(JSON.stringify(attributes)));

  // Hooks
  const { lang: locale } = useParams()

  

  const handleEdit = row => {
    setAttributes(row);
    setCandidate(row);
    setOpen(true);
  }
  
  const handleDelete = row => {
    if (window.confirm(`Are you sure you want to delete ${row.allergy_name}?`)) {
      // send DELETE request to modify DB
      setData(prev => prev.filter(item => item.allergy_name !== row.allergy_name && item.date_diagnosed !== row.date_diagnosed))
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
      columnHelper.accessor('allergy_name', {
        header: 'Name',
        cell: ({ row }) => (
          <div className='flex items-center gap-3'>
            <Typography>{`${row.original.allergy_name}`}</Typography>
          </div>
        )
      }),
      columnHelper.accessor('category_name', {
        header: 'Category',
        cell: ({ row }) => <Typography>{`${row.original.category_name}`}</Typography>
      }),
      columnHelper.accessor('common_symptoms', {
        header: 'Common Symptoms',
        cell: ({ row }) => <Typography>{`${row.original.common_symptoms}`}</Typography>
      }),
      columnHelper.accessor('description', {
        header: 'Description',
        cell: ({ row }) => <Typography>{`${row.original.description}`}</Typography>
      }),
      columnHelper.accessor('symptoms', {
        header: 'Symptoms',
        cell: ({ row }) => <Typography>{`${row.original.symptoms}`}</Typography>
      }),
      columnHelper.accessor('severity_name', {
        header: 'Serverity',
        cell: ({ row }) => <Typography>{`${row.original.severity_name}`}</Typography>
      }),
      columnHelper.accessor('date_diagnosed', {
        header: 'Date Diagnosed',
        cell: ({ row }) => <Typography>{`${formatDate(new Date(row.original.date_diagnosed))}`}</Typography>
      }),
      columnHelper.accessor('notes', {
        header: 'Notes',
        cell: ({ row }) => <Typography>{`${row.original.notes}`}</Typography>
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
      sorting: [{ id: 'date_diagnosed', desc: true }],
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
        <CardHeader title='Allergy History' action={<OptionMenu options={['Refresh', 'Update', 'Share']} />} />
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
            defaultValue={attributes.allergy_name}
            onChange={event => candidate.allergy_name = event.target.value}
            variant="filled"
            size="small"
          />
          <TextField
            fullWidth
            disabled
            label="Category"
            id="filled-hidden-label-small"
            defaultValue={attributes.category_name}
            variant="filled"
            size="small"
          />
          <TextField
            fullWidth
            disabled
            label="Common Symptoms"
            id="filled-hidden-label-small"
            defaultValue={attributes.common_symptoms}
            onChange={event => candidate.common_symptoms = event.target.value}
            variant="filled"
            size="small"
          />
          <TextField
            fullWidth
            disabled
            label="Description"
            id="filled-hidden-label-small"
            defaultValue={attributes.description}
            onChange={event => candidate.description = event.target.value}
            variant="filled"
            size="small"
          />
          <TextField
            fullWidth
            label="Symptoms"
            id="filled-hidden-label-small"
            defaultValue={attributes.symptoms}
            onChange={event => candidate.symptoms = event.target.value}
            variant="filled"
            size="small"
          />
          <InputLabel id="demo-simple-select-label">Severity</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={attributes.severity_name}
            onChange={event => candidate.severity_name = event.target.value}
            label="Severity"
          >
            <MenuItem value={`Low`}>Low</MenuItem>
            <MenuItem value={`Medium`}>Medium</MenuItem>
            <MenuItem value={`High`}>High</MenuItem>
          </Select>
          <TextField
            fullWidth
            label="Date Diagnosed"
            id="filled-hidden-label-small"
            defaultValue={formatDate(new Date(attributes.date_diagnosed))}
            onChange={event => candidate.date_diagnosed = formatDate(new Date(event.target.value))}
            variant="filled"
            size="small"
          />
          <TextField
            fullWidth
            label="Notes"
            id="filled-hidden-label-small"
            defaultValue={attributes.notes}
            onChange={event => candidate.notes = event.target.value}
            variant="filled"
            size="small"
          />            
          </div>
          <Button onClick={handleSave}>Save</Button>
          <Button onClick={handleClose}>Cancel</Button>
        </Box>
      </Modal>
    </>
  )
}

export default AllergyTable
