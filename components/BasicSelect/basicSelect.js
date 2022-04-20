import React, { useContext } from 'react'
import Box from '@mui/material/Box'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'

import { AccountContext } from '../../contexts/AccountContext'

export default function BasicSelect() {
    const { time, setTime } = useContext(AccountContext)

    const handleChange = (event) => {
        setTime(event.target.value, String)
    }

    return (
        <div className="pl-3 w-[53%] pb-3 pt-3">
            <Box sx={{ minWidth: 120 }}>
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">
                        Selecione a sua hora de chegada
                    </InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={time}
                        label="time"
                        onChange={handleChange}
                        color="warning"
                    >
                        <MenuItem value={1} disabled>
                            01h00AM
                        </MenuItem>
                        <MenuItem value={2} disabled>
                            02h00AM
                        </MenuItem>
                        <MenuItem value={3} disabled>
                            03h00AM
                        </MenuItem>
                        <MenuItem value={4} disabled>
                            04h00AM
                        </MenuItem>
                        <MenuItem value={5} disabled>
                            05h00AM
                        </MenuItem>
                        <MenuItem value={6} disabled>
                            06h00AM
                        </MenuItem>
                        <MenuItem value={7} disabled>
                            07h00AM
                        </MenuItem>
                        <MenuItem value={8} disabled>
                            08h00AM
                        </MenuItem>
                        <MenuItem value={9} disabled>
                            09h00AM
                        </MenuItem>
                        <MenuItem value={10} disabled>
                            10h00AM
                        </MenuItem>
                        <MenuItem value={11} disabled>
                            11h00AM
                        </MenuItem>
                        <MenuItem value={12} disabled>
                            12h00AM
                        </MenuItem>
                        <MenuItem value={13} disabled>
                            01h00PM
                        </MenuItem>
                        <MenuItem value={14} disabled>
                            02h00PM
                        </MenuItem>
                        <MenuItem value={15} disabled>
                            03h00PM
                        </MenuItem>
                        <MenuItem value={16}>04h00PM</MenuItem>
                        <MenuItem value={17}>05h00PM</MenuItem>
                        <MenuItem value={18}>06h00PM</MenuItem>
                        <MenuItem value={19}>07h00PM</MenuItem>
                        <MenuItem value={20}>08h00PM</MenuItem>
                        <MenuItem value={21}>09h00PM</MenuItem>
                        <MenuItem value={22}>10h00PM</MenuItem>
                        <MenuItem value={23}>11h00PM</MenuItem>
                        <MenuItem value={24} disabled>
                            12h00PM
                        </MenuItem>
                    </Select>
                </FormControl>
            </Box>
        </div>
    )
}
