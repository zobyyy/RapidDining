import { useState } from 'react'
import Box from '@mui/material/Box'
import FormControl from '@mui/material/FormControl'
import { NativeSelect } from '@mui/material'

export default function PeopleSelect({ handleSelect }) {
  return (
    <Box sx={{ minWidth: 40 }}>
      <FormControl fullWidth>
        <NativeSelect
          defaultValue={1}
          inputProps={{
            name: 'age',
            id: 'uncontrolled-native'
          }}
          sx={{ color: '#959595' }}
          onChange={(e) => handleSelect(e.target.value)}
        >
          <option value={1}>1位</option>
          <option value={2}>2位</option>
          <option value={3}>3位</option>
          <option value={4}>4位</option>
          <option value={5}>5位</option>
          <option value={6}>6位</option>
        </NativeSelect>
      </FormControl>
    </Box>
  )
}
