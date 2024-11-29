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

// Format the date into 'MM/DD/YYYY'
const formattedDate = (date) => {return `${String(date.getMonth() + 1).padStart(2, '0')}/${String(date.getDate()).padStart(2, '0')}/${date.getFullYear()}`};


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
  const [add, setAdd] = useState(false);
  const [data, setData] = useState(...[administered])
  const { data: session, status } = useSession()
  const [attributes, setAttributes] = useState(administeredParams)
  const [candidate, setCandidate] = useState(JSON.parse(JSON.stringify(attributes)));

  // Row Action
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleEdit = row => { setAttributes(row); setCandidate(row); setOpen(true) }

  const handleDelete = async row => {
    if (window.confirm(`Are you sure you want to delete?`)) {
      // send DELETE request to modify DB

      const response = await axios.delete(`/api/pages/profile/administered?id=${row.administered_id}`);

      if (response.status != 200) {
        alert(`Can't delete user information, please contact administrator.`);
      }

      setData(prev => prev.filter(item => item.end_date !== row.end_date && item.date_administered !== row.date_administered))
    }
  }

  // Add Action
  const handleSave = async () => {
    // data preprocessing
    delete candidate.medication_name
    delete candidate.effectiveness_name
    delete candidate.frequency_name

    console.log(candidate)

    const response = await axios.put(`/api/pages/profile/administered`, candidate);

    if (response.status != 200) {
      alert(`Can't update user information, please contact administrator.`);
    }

    setOpen(false);

    // Force refresh the page
    window.location.reload();
  };

  const handleAdd = async () => {
    // data preprocessing
    candidate.user_id = session.user.id;
    delete candidate.administered_id;
    delete candidate.medication_name
    delete candidate.effectiveness_name
    delete candidate.frequency_name

    if (Object.values(candidate).includes('')) {
      alert('Please fill out all the blanks!');

      return;
    }

    console.log(candidate)

    const response = await axios.post(`/api/pages/profile/administered`, candidate);

    if (response.status != 200) {
      alert(`Can't update user information, please contact administrator.`);
    }

    setAdd(false);

    // Force refresh the page
    window.location.reload();
  }

  const columns = useMemo(
    () => [
      columnHelper.accessor('date_administered', {
        header: 'Date Administered',
        cell: ({ row }) => (
            <Typography align='center'>{`${formattedDate(new Date(row.original.date_administered))}`}</Typography>
        )
      }),
      columnHelper.accessor('medication_name', {
        header: 'Medication Name',
        cell: ({ row }) => <Typography align='center'>{`${row.original.medication_name}`}</Typography>
      }),
      columnHelper.accessor('end_date', {
        header: 'End Date',
        cell: ({ row }) => <Typography align='center'>{`${formattedDate(new Date(row.original.end_date))}`}</Typography>
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
      }),
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
        <CardHeader title='Administered History' action={<Button variant="contained" color="primary" onClick={()=>{setAdd(true)}}>Add</Button>} />
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
        open={add}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <InputLabel id="medication-select-label">Medication name</InputLabel>
          <Select
            fullWidth
            defaultOpen
            labelId="medication-select-label"
            id="medication-select"
            onChange={event => candidate.medication_id = event.target.value}
            label="medication_name"
          >
            <MenuItem value={1}>Aspirin</MenuItem>
            <MenuItem value={2}>Amoxicillin</MenuItem>
            <MenuItem value={3}>Ibuprofen</MenuItem>
            <MenuItem value={4}>Lisinopril</MenuItem>
            <MenuItem value={5}>Metformin</MenuItem>
            <MenuItem value={6}>Atorvastatin</MenuItem>
            <MenuItem value={7}>Omeprazole</MenuItem>
            <MenuItem value={8}>Losartan</MenuItem>
            <MenuItem value={9}>Levothyroxine</MenuItem>
            <MenuItem value={10}>Hydrochlorothiazide</MenuItem>
            <MenuItem value={11}>Sertraline</MenuItem>
            <MenuItem value={12}>Prednisone</MenuItem>
            <MenuItem value={13}>Gabapentin</MenuItem>
            <MenuItem value={14}>Clonazepam</MenuItem>
            <MenuItem value={15}>Albuterol</MenuItem>
            <MenuItem value={16}>Simvastatin</MenuItem>
            <MenuItem value={17}>Ciprofloxacin</MenuItem>
            <MenuItem value={18}>Warfarin</MenuItem>
            <MenuItem value={19}>Lorazepam</MenuItem>
            <MenuItem value={20}>Montelukast</MenuItem>
            <MenuItem value={21}>Tamsulosin</MenuItem>
            <MenuItem value={22}>Oxycodone</MenuItem>
            <MenuItem value={23}>Esomeprazole</MenuItem>
            <MenuItem value={24}>Metoprolol</MenuItem>
            <MenuItem value={25}>Fluoxetine</MenuItem>
            <MenuItem value={26}>Cetirizine</MenuItem>
            <MenuItem value={27}>Furosemide</MenuItem>
            <MenuItem value={28}>Amlodipine</MenuItem>
            <MenuItem value={29}>Tramadol</MenuItem>
            <MenuItem value={30}>Doxycycline</MenuItem>
          </Select>
          <TextField
            fullWidth
            label="Date administered"
            id="filled-hidden-label-small"
            onChange={event => candidate.date_administered = event.target.value}
            placeholder='2024-11-26'
            variant="filled"
            size="small"
          />
          <TextField
            fullWidth
            label="End date"
            id="filled-hidden-label-small"
            onChange={event => candidate.end_date = event.target.value}
            placeholder='2024-11-26'
            variant="filled"
            size="small"
          />
          <TextField
            fullWidth
            label="Dosage"
            id="filled-hidden-label-small"
            onChange={event => candidate.dosage = event.target.value}
            variant="filled"
            size="small"
          />
          <InputLabel id="effectiveness-select-label">Effectiveness</InputLabel>
          <Select
            fullWidth
            labelId="effectiveness-select-label"
            id="effectiveness-select"
            onChange={event => candidate.effectiveness_id = event.target.value}
            label="Effectiveness"
          >
            <MenuItem value={1}>Low</MenuItem>
            <MenuItem value={2}>Medium</MenuItem>
            <MenuItem value={3}>High</MenuItem>
          </Select>
          <TextField
            fullWidth
            label="Notes"
            id="filled-hidden-label-small"
            onChange={event => candidate.side_effects = event.target.value}
            variant="filled"
            size="small"
          />
          <InputLabel id="frequency-select-label">Frequency</InputLabel>
          <Select
            fullWidth
            labelId="frequency-select-label"
            id="frequency-select"
            onChange={event => candidate.frequency_id = event.target.value}
            label="Frequency"
          >
            <MenuItem value={1}>Daily</MenuItem>
            <MenuItem value={2}>Weekly</MenuItem>
            <MenuItem value={3}>Monthly</MenuItem>
          </Select>
          <Box>
            <Button onClick={()=>{handleAdd()}}>Add</Button>
            <Button onClick={()=>{setAdd(false)}}>Cancel</Button>
          </Box>
        </Box>
      </Modal>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <InputLabel id="medication-select-label">Medication name</InputLabel>
          <Select
            fullWidth
            defaultOpen
            labelId="medication-select-label"
            id="medication-select"
            defaultValue={attributes.medication_name}
            onChange={event => candidate.medication_id = event.target.value}
            label="medication_name"
          >
            <MenuItem value={1}>Aspirin</MenuItem>
            <MenuItem value={2}>Amoxicillin</MenuItem>
            <MenuItem value={3}>Ibuprofen</MenuItem>
            <MenuItem value={4}>Lisinopril</MenuItem>
            <MenuItem value={5}>Metformin</MenuItem>
            <MenuItem value={6}>Atorvastatin</MenuItem>
            <MenuItem value={7}>Omeprazole</MenuItem>
            <MenuItem value={8}>Losartan</MenuItem>
            <MenuItem value={9}>Levothyroxine</MenuItem>
            <MenuItem value={10}>Hydrochlorothiazide</MenuItem>
            <MenuItem value={11}>Sertraline</MenuItem>
            <MenuItem value={12}>Prednisone</MenuItem>
            <MenuItem value={13}>Gabapentin</MenuItem>
            <MenuItem value={14}>Clonazepam</MenuItem>
            <MenuItem value={15}>Albuterol</MenuItem>
            <MenuItem value={16}>Simvastatin</MenuItem>
            <MenuItem value={17}>Ciprofloxacin</MenuItem>
            <MenuItem value={18}>Warfarin</MenuItem>
            <MenuItem value={19}>Lorazepam</MenuItem>
            <MenuItem value={20}>Montelukast</MenuItem>
            <MenuItem value={21}>Tamsulosin</MenuItem>
            <MenuItem value={22}>Oxycodone</MenuItem>
            <MenuItem value={23}>Esomeprazole</MenuItem>
            <MenuItem value={24}>Metoprolol</MenuItem>
            <MenuItem value={25}>Fluoxetine</MenuItem>
            <MenuItem value={26}>Cetirizine</MenuItem>
            <MenuItem value={27}>Furosemide</MenuItem>
            <MenuItem value={28}>Amlodipine</MenuItem>
            <MenuItem value={29}>Tramadol</MenuItem>
            <MenuItem value={30}>Doxycycline</MenuItem>
          </Select>
          <TextField
            fullWidth
            label="Date administered"
            id="filled-hidden-label-small"
            defaultValue={formatDate(new Date(attributes.date_administered))}
            onChange={event => candidate.date_administered = formatDate(new Date(event.target.value))}
            variant="filled"
            size="small"
          />
          <TextField
            fullWidth
            label="End date"
            id="filled-hidden-label-small"
            defaultValue={formatDate(new Date(attributes.end_date))}
            onChange={event => candidate.end_date = formatDate(new Date(event.target.value))}
            variant="filled"
            size="small"
          />
          <TextField
            fullWidth
            label="Dosage"
            id="filled-hidden-label-small"
            defaultValue={attributes.dosage}
            onChange={event => candidate.dosage = event.target.value}
            variant="filled"
            size="small"
          />
          <InputLabel id="effectiveness-select-label">Effectiveness</InputLabel>
          <Select
            fullWidth
            labelId="effectiveness-select-label"
            id="effectiveness-select"
            defaultValue={attributes.effectiveness_name == 'Low' ? 1 : attributes.effectiveness_name == 'Medium' ? 2 : 3}
            onChange={event => candidate.effectiveness_id = event.target.value}
            label="Effectiveness"
          >
            <MenuItem value={1}>Low</MenuItem>
            <MenuItem value={2}>Medium</MenuItem>
            <MenuItem value={3}>High</MenuItem>
          </Select>
          <TextField
            fullWidth
            label="Side effects"
            id="filled-hidden-label-small"
            defaultValue={attributes.side_effects}
            onChange={event => candidate.side_effects = event.target.value}
            variant="filled"
            size="small"
          />
          <InputLabel id="frequency-select-label">Frequency</InputLabel>
          <Select
            fullWidth
            labelId="frequency-select-label"
            id="frequency-select"
            defaultValue={attributes.frequency_name == 'Daily' ? 1 : attributes.frequency_name == 'Weekly' ? 2 : 3}
            onChange={event => candidate.frequency_id = event.target.value}
            label="Frequency"
          >
            <MenuItem value={1}>Daily</MenuItem>
            <MenuItem value={2}>Weekly</MenuItem>
            <MenuItem value={3}>Monthly</MenuItem>
          </Select>
          <Box>
            <Button onClick={handleSave}>Save</Button>
            <Button onClick={handleClose}>Cancel</Button>
          </Box>
        </Box>
      </Modal>
    </>
  )
}

export default AdministeredTable
