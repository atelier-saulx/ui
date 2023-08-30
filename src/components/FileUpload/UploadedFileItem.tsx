import React, { useState } from 'react'
import {
  styled,
  color,
  AudioIcon,
  AttachmentIcon,
  Text,
  MoreIcon,
  useContextMenu,
  ContextItem,
  DeleteIcon,
  EditIcon,
  ExternalLinkAltIcon,
  DownloadIcon,
  PlayIcon,
  FileIcon,
  ZoomInIcon,
  TextIcon,
  resizeImage,
} from '~'

const StyledUploadedFile = styled('div', {
  display: 'flex',
  overflow: 'hidden',
  border: `1px solid ${color('border')}`,
  backgroundColor: color('background'),
  borderRadius: 8,
  alignItems: 'center',
  marginBottom: 8,
  position: 'relative',
  cursor: 'auto',
})

const StyledMoreIcon = styled('div', {
  position: 'absolute',
  width: 24,
  height: 24,
  right: 16,
  borderRadius: 4,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  '@media (hover: hover)': {
    '&:hover': {
      cursor: 'pointer',
      background: color('background2'),
    },
  },
})

const CacheBackground = ({ file }) => {
  if (!file.src) {
    file.src = URL.createObjectURL(file)
  }
  const [url, setUrl] = useState(file.src)

  return (
    <div
      style={{
        height: 62,
        flexShrink: 0,
        width: 62 + 4,
        backgroundPosition: 'center',
        backgroundImage: `url(${resizeImage(url, 64)})`,
        backgroundSize: 'cover',
      }}
    >
      <img
        style={{ display: 'none' }}
        src={file.src}
        onLoad={() => {
          setUrl(file.src)
        }}
      />
    </div>
  )
}

const VideoPreview = ({ file }) => {
  if (!file.src) {
    file.src = URL.createObjectURL(file)
  }
  return (
    <div
      style={{
        height: 62,
        width: 62,
        backgroundColor: 'black',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <video src={file.src + '#t=5'} />
      <PlayIcon size={20} style={{ color: 'white' }} />
    </div>
  )
}

const AudioPreview = ({ file }) => {
  if (!file.src) {
    file.src = URL.createObjectURL(file)
  }
  return (
    <styled.div
      style={{
        height: 62,
        width: 62,
        backgroundColor: color('background2'),
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <AudioIcon size={20} />
    </styled.div>
  )
}

export const UploadedFileItem = ({
  file,
  handleClickUpload,
  deleteSpecificFile,
  openInNewTab,
  id,
  replaceSpecificFile,
  duplicateFile,
  downloadFile,
  renameFile,
  fullScreenView,
  fileName,
}) => {
  const contextHandler = useContextMenu(
    ContextOptions,
    {
      handleClickUpload,
      deleteSpecificFile,
      id,
      replaceSpecificFile,
      openInNewTab,
      duplicateFile,
      downloadFile,
      renameFile,
      fullScreenView,
      file,
    },
    { placement: 'right' }
  )

  return (
    <StyledUploadedFile>
      {file?.type?.includes('image') ? (
        <CacheBackground file={file} />
      ) : file?.type?.includes('video') ? (
        <VideoPreview file={file} />
      ) : file?.type?.includes('audio') ? (
        <AudioPreview file={file} />
      ) : (
        <styled.div
          style={{
            height: 62,
            width: 62,
            backgroundColor: color('background2'),
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          {file?.type?.includes('text') ? (
            <FileIcon />
          ) : file?.type?.includes('font') ? (
            <TextIcon />
          ) : (
            <AttachmentIcon />
          )}
        </styled.div>
      )}

      <Text
        style={{
          minHeight: '20px',
          marginTop: 6,
          marginBottom: 6,
          marginLeft: 12,
          marginRight: 64,
          maxWidth: 'calc(90% - 64px)',
          flexShrink: 0,
        }}
        typography="body500"
      >
        {fileName || file?.name}
      </Text>

      <StyledMoreIcon onClick={contextHandler}>
        <MoreIcon />
      </StyledMoreIcon>
    </StyledUploadedFile>
  )
}

const ContextOptions = ({
  // handleClickUpload,
  file,
  deleteSpecificFile,
  id,
  openInNewTab,
  downloadFile,
  renameFile,
  fullScreenView,
}) => {
  return (
    <>
      {/* TODO if multiple file upload works or if multiple file then option to duplicate */}
      {/* <ContextItem onClick={() => duplicateFile()} icon={CopyIcon}>
        Duplicate
      </ContextItem> */}
      <ContextItem onClick={() => fullScreenView(file)} icon={ZoomInIcon}>
        Expand
      </ContextItem>
      <ContextItem onClick={() => openInNewTab()} icon={ExternalLinkAltIcon}>
        Open in new tab
      </ContextItem>
      <ContextItem onClick={() => renameFile(file, id)} icon={EditIcon}>
        Rename
      </ContextItem>
      {/* TODO if multiple file upload works or if multiple file then option to replace specific id file */}
      {/* <ContextItem onClick={() => replaceSpecificFile(id)} icon={ReplaceIcon}>
        Replace
      </ContextItem> */}
      <ContextItem onClick={() => downloadFile()} icon={DownloadIcon}>
        Download
      </ContextItem>
      <ContextItem
        onClick={() => deleteSpecificFile(id)}
        icon={DeleteIcon}
        style={{ borderTop: `1px solid ${color('border')}` }}
      >
        Delete
      </ContextItem>
    </>
  )
}
