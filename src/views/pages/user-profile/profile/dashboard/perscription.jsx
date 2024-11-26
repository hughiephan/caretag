'use client'

// React Imports
import { useState, useMemo } from 'react'

// MUI Imports
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import Checkbox from '@mui/material/Checkbox'  
import Typography from '@mui/material/Typography'
import TablePagination from '@mui/material/TablePagination'
import Modal from '@mui/material/Modal'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button' 
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
  width: '60%',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const default_doctorAttr = {
    doctor_first_name: '',
    doctor_middle_names: '',
    doctor_last_name: '',
    doctor_phone: '',
    doctor_email: '',
    license_number:'',
    specialization:'',
}

const default_medicationAttr = {
    medication_name: '',
    manufacturer: '',
    medication_type_id: '',
    strength: '',
    unit_of_measure_id: '',
    description: '',
    side_effects: '',
    medication_type_name: '',
    unit_of_measure_name: '',
}

// Column Definitions
const columnHelper = createColumnHelper()

const PerscriptionTable = ({prescriptions}) => {
  // States
  const [rowSelection, setRowSelection] = useState({})
  
  // Show detail modal popup
  const [openDoctorDetail, setOpenDoctorDetail] = useState(false);
  const [doctorAttributes, setDoctorAttributes] = useState(default_doctorAttr);
  const [openMedicationDetail, setOpenMedicationDetail] = useState(false);
  const [medicationAttributes, setMedicationAttributes] = useState(default_medicationAttr);

  const [open, setOpen] = useState(false);

  const handleClose = () => setOpen(false);

  const handleEdit = row => {
    setAttributes(row);
    setOpen(true);
  }
  
  const handleDelete = row => {
    if (window.confirm(`Are you sure you want to delete ${row.name}?`)) {
      // send DELETE request to modify DB
      setData(prev => prev.filter(item => item.name !== row.name && item.dateDiagnosed !== row.dateDiagnosed))
    }
  }

  const Fakeprescriptions = [
    {
        // perscription
        prescription_id: '1',
        user_id: '1',
        doctor_id: '1',
        medication_id: '1',
        date: '1/1/2000',
        dosage: 1.1,
        frequency_id: '1',
        refills: 1,
        notes: 'notes',

        // doctor
        license_number:'1',
        user_id:'1',
        specialization:'1',

        // users (doctor)
        doctor_first_name: 'doctor_first_name',
        doctor_middle_names: 'doctor_middle_names',
        doctor_last_name: 'doctor_last_name',
        doctor_phone: 'doctor_phone',
        doctor_email: 'doctor_email',

        // medication
        medication_name: 'medication_name',
        manufacturer: 'medication_manufacturer',
        medication_type_id: '1',
        strength: '100',
        unit_of_measure_id: '1',
        description: 'medication_description',
        side_effects: 'medication_side_effects',

        // medication_type
        medication_type_name: 'medication_type',

        // unit_of_measure
        unit_of_measure_name: 'unit_of_measure_name',

        // frequency
        frequency_name: 'frequency_name'
    }
  ];

  const [data, setData] = useState(...[prescriptions])



  const columns = useMemo(
    () => [
      // {
      //   id: 'select',
      //   header: ({ table }) => (
      //     <Checkbox
      //       {...{
      //         checked: table.getIsAllRowsSelected(),
      //         indeterminate: table.getIsSomeRowsSelected(),
      //         onChange: table.getToggleAllRowsSelectedHandler()
      //       }}
      //     />
      //   ),
      //   cell: ({ row }) => (
      //     <Checkbox
      //       {...{
      //         checked: row.getIsSelected(),
      //         disabled: !row.getCanSelect(),
      //         indeterminate: row.getIsSomeSelected(),
      //         onChange: row.getToggleSelectedHandler()
      //       }}
      //     />
      //   )
      // },
      columnHelper.accessor('perscription_date', {
        header: 'Date',
        cell: ({ row }) => <Typography>{`${row.original.date}`}</Typography>
      }),
      columnHelper.accessor('perscription_dosage', {
        header: 'Dosage',
        cell: ({ row }) => <Typography>{`${row.original.dosage}`}</Typography>
      }),
      columnHelper.accessor('frequency_name', {
        header: 'Frequency',
        cell: ({ row }) => <Typography>{`${row.original.frequency_name}`}</Typography>
      }),
      columnHelper.accessor('perscription_refills', {
        header: 'Refills',
        cell: ({ row }) => <Typography>{`${row.original.refills}`}</Typography>
      }),
      columnHelper.accessor('perscription_notes', {
        header: 'Notes',
        cell: ({ row }) => <Typography>{`${row.original.notes}`}</Typography>
      }),
      columnHelper.accessor('doctor_detail', {
        header: 'Doctor',
        cell: ({ row }) => 
            <>
                <Typography align='center'>
                    <IconButton size='small' onClick={() => {setOpenDoctorDetail(true); setDoctorAttributes(row.original);}}>
                    <i className='ri-stethoscope-line text-textSecondary' />
                    </IconButton>
                </Typography>
            </>
      }),
      columnHelper.accessor('medication_detail', {
        header: 'Medication',
        cell: ({ row }) => 
            <>
                <Typography align='center'>
                    <IconButton size='small' onClick={() => {setOpenMedicationDetail(true); setMedicationAttributes(row.original);}}>
                    <i className='ri-capsule-fill text-textSecondary' />
                    </IconButton>
                </Typography>
            </>
      }),
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
        <CardHeader title='Perscription History' action={<OptionMenu options={['Refresh', 'Update', 'Share']} />} />
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
        open={openDoctorDetail}
        onClose={()=>{setOpenDoctorDetail(false)}}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div>
            <div className='flex items-center gap-2 pt-3'>
                <i className={'ri-play-fill'} />
                <div className='flex items-center flex-wrap gap-2'>
                <Typography className='font-medium'>Name:</Typography>
                <Typography> {`${doctorAttributes.doctor_first_name} ${doctorAttributes.doctor_middle_names} ${doctorAttributes.doctor_last_name}`} </Typography>
                </div>
            </div>
            <div className='flex items-center gap-2 pt-3'>
                <i className={'ri-phone-line'} />
                <div className='flex items-center flex-wrap gap-2'>
                <Typography className='font-medium'>Phone:</Typography>
                <Typography> {doctorAttributes.doctor_phone} </Typography>
                </div>
            </div>
            <div className='flex items-center gap-2 pt-3'>
                <i className={'ri-mail-line'} />
                <div className='flex items-center flex-wrap gap-2'>
                <Typography className='font-medium'>Email:</Typography>
                <Typography> {doctorAttributes.doctor_email} </Typography>
                </div>
            </div>
            <div className='flex items-center gap-2 pt-3'>
                <i className={'ri-hashtag'} />
                <div className='flex items-center flex-wrap gap-2'>
                <Typography className='font-medium'>License Number:</Typography>
                <Typography> {doctorAttributes.license_number} </Typography>
                </div>
            </div>
            <div className='flex items-center gap-2 pt-3'>
                <i className={'ri-verified-badge-line'} />
                <div className='flex items-center flex-wrap gap-2'>
                <Typography className='font-medium'>Specialization:</Typography>
                <Typography> {doctorAttributes.specialization} </Typography>
                </div>
            </div>
          </div>
          <Button onClick={()=>{setOpenDoctorDetail(false)}}>Close</Button>
          {/* <Button onClick={()=>{setOpenDoctorDetail(false)}}>Cancel</Button> */}
        </Box>
      </Modal>
      <Modal
        open={openMedicationDetail}
        onClose={()=>{setOpenMedicationDetail(false)}}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div>
            <div className='flex items-center gap-2'>
                <i className={'ri-play-fill'} />
                <div className='flex items-center flex-wrap gap-2'>
                <Typography className='font-medium'>Name:</Typography>
                <Typography> {medicationAttributes.medication_name} </Typography>
                </div>
            </div>
            <div className='flex items-center gap-2 pt-3'>
                <i className={'ri-building-3-line'} />
                <div className='flex items-center flex-wrap gap-2'>
                <Typography className='font-medium'>Manufacturer:</Typography>
                <Typography> {medicationAttributes.manufacturer} </Typography>
                </div>
            </div>
            <div className='flex items-center gap-2 pt-3'>
                <i className={'ri-circle-line'} />
                <div className='flex items-center flex-wrap gap-2'>
                <Typography className='font-medium'>Strength:</Typography>
                <Typography> {medicationAttributes.strength} </Typography>
                </div>
            </div>
            <div className='flex items-center gap-2 pt-3'>
                <i className={'ri-quote-text'} />
                <div className='flex items-center flex-wrap gap-2'>
                <Typography className='font-medium'>Description:</Typography>
                <Typography> {medicationAttributes.description} </Typography>
                </div>
            </div>
            <div className='flex items-center gap-2 pt-3'>
                <i className={'ri-dropper-fill'} />
                <div className='flex items-center flex-wrap gap-2'>
                <Typography className='font-medium'>Side effects:</Typography>
                <Typography> {medicationAttributes.side_effects} </Typography>
                </div>
            </div>
            <div className='flex items-center gap-2 pt-3'>
                <i className={'ri-syringe-line'} />
                <div className='flex items-center flex-wrap gap-2'>
                <Typography className='font-medium'>Medication type:</Typography>
                <Typography> {medicationAttributes.medication_type_name} </Typography>
                </div>
            </div>
            <div className='flex items-center gap-2 pt-3'>
                <i className={'ri-aed-electrodes-line'} />
                <div className='flex items-center flex-wrap gap-2'>
                <Typography className='font-medium'>Unit of measure name:</Typography>
                <Typography> {medicationAttributes.unit_of_measure_name} </Typography>
                </div>
            </div>
          </div>
          <Button onClick={()=>{setOpenMedicationDetail(false)}}>Close</Button>
          {/* <Button onClick={()=>{setOpenMedicationDetail(false)}}>Cancel</Button> */}
        </Box>
      </Modal>
    </>
  )
}

export default PerscriptionTable
