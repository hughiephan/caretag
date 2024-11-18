'use client'

// Component Imports
import FileUploaderRestrictions from './UploadFileBlock'

const AppDocument = () => {
  return (
    <>
      <div className='p-5 pbe-0 flex-grow overflow-visible bg-backgroundPaper rounded'>
        <FileUploaderRestrictions />
      </div>
    </>
  )
}

export default AppDocument
