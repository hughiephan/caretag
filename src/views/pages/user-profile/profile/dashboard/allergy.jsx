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

    if (status != "authenticated") {
      console.log('missing user id to update bmi')

      return;
    }

    candidate.user_id = session.user.id;
    candidate.date_diagnosed = candidate.date_diagnosed === '' ? formatDate(new Date(attributes.date_diagnosed)) : formatDate(new Date(candidate.date_diagnosed));
    delete candidate.allergy_name
    delete candidate.category_name;
    delete candidate.common_symptoms
    delete candidate.description
    delete candidate.severity_name
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

  const handleEdit = row => {
    setAttributes(row);
    setCandidate(row);
    setOpen(true);
  }

  const handleDelete = async row => {
    if (window.confirm(`Are you sure you want to delete ${row.allergy_name}?`)) {
      // send DELETE request to modify DB
      console.log(row)

      row.date_diagnosed = formatDate(new Date(row.date_diagnosed))
      const response = await axios.delete(`/api/pages/profile/allergy`, {data: row});

      if (response.status != 200) {
        alert(`Can't delete user information, please contact administrator.`);
      }

      setData(prev => prev.filter(item => item.allergy_name !== row.allergy_name && formatDate(new Date(item.date_diagnosed)) !== formatDate(new Date(row.date_diagnosed))))
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
          <InputLabel id="name-select-label">Name</InputLabel>
          <Select
            fullWidth
            labelId="name-select-label"
            id="name-select"
            defaultValue={1}
            onChange={event => candidate.allergy_id = event.target.value}
            label="Name"
          >
            <MenuItem value={1}>Peanut Allergy</MenuItem>
            <MenuItem value={2}>Shellfish Allergy</MenuItem>
            <MenuItem value={3}>Pollen Allergy</MenuItem>
            <MenuItem value={4}>Dust Mite Allergy</MenuItem>
            <MenuItem value={5}>Egg Allergy</MenuItem>
            <MenuItem value={6}>Milk Allergy</MenuItem>
            <MenuItem value={7}>Pet Dander Allergy</MenuItem>
            <MenuItem value={8}>Insect Sting Allergy</MenuItem>
            <MenuItem value={9}>Wheat Allergy</MenuItem>
            <MenuItem value={10}>Soy Allergy</MenuItem>
            <MenuItem value={11}>Mold Allergy</MenuItem>
            <MenuItem value={12}>Tree Nut Allergy</MenuItem>
            <MenuItem value={13}>Latex Allergy</MenuItem>
            <MenuItem value={14}>Penicillin Allergy</MenuItem>
            <MenuItem value={15}>Fragrance Allergy</MenuItem>
            <MenuItem value={16}>Sun Allergy</MenuItem>
            <MenuItem value={17}>Avocado Allergy</MenuItem>
            <MenuItem value={18}>Banana Allergy</MenuItem>
            <MenuItem value={19}>Garlic Allergy</MenuItem>
            <MenuItem value={20}>Nickel Allergy</MenuItem>
            <MenuItem value={21}>Apple Allergy</MenuItem>
            <MenuItem value={22}>Strawberry Allergy</MenuItem>
            <MenuItem value={23}>Sesame Allergy</MenuItem>
            <MenuItem value={24}>Bee Pollen Allergy</MenuItem>
            <MenuItem value={25}>Chocolate Allergy</MenuItem>
            <MenuItem value={26}>Chicken Allergy</MenuItem>
            <MenuItem value={27}>Oat Allergy</MenuItem>
            <MenuItem value={28}>Perfume Allergy</MenuItem>
            <MenuItem value={29}>Coconut Allergy</MenuItem>
            <MenuItem value={30}>Fish Allergy</MenuItem>
            <MenuItem value={31}>Mustard Allergy</MenuItem>
            <MenuItem value={32}>Meat Allergy</MenuItem>
            <MenuItem value={33}>Sunflower Seed Allergy</MenuItem>
            <MenuItem value={34}>Tomato Allergy</MenuItem>
            <MenuItem value={35}>Sulphite Allergy</MenuItem>
            <MenuItem value={36}>Carrot Allergy</MenuItem>
            <MenuItem value={37}>Yeast Allergy</MenuItem>
            <MenuItem value={38}>Pepper Allergy</MenuItem>
          </Select>
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
            fullWidth
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            defaultValue={1}
            onChange={event => candidate.severity_id = event.target.value}
            label="Severity"
          >
            <MenuItem value={1}>Low</MenuItem>
            <MenuItem value={2}>Medium</MenuItem>
            <MenuItem value={3}>High</MenuItem>
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
