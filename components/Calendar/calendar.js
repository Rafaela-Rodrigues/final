import { useState, useContext } from 'react'
import {
    Box,
    TextField,
    InputAdornment,
    Divider,
    Fab,
    useMediaQuery,
    Button,
    Stack,
    Autocomplete,
    Typography,
    Tooltip,
    ClickAwayListener,
} from '@mui/material'
import { Place, Search, DateRange, ErrorOutline } from '@mui/icons-material'
import { DateRangePicker, LocalizationProvider } from '@mui/lab'
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import { styled, darken, lighten, useTheme } from '@mui/material/styles'
import { ptBR } from 'date-fns/locale'
import { format } from 'date-fns'
import { useRouter } from 'next/router'
import { AccountContext } from '../../contexts/AccountContext'

/**
 * Renders SearchBar component with search Location end Date
 * @param {func} [handleSubmit] - function to be called when submit button is clicked
 * @param {boolean} [column] - if true, search bar will be displayed in a column
 */
const calendar = ({
    handleSubmit,
    column,
    placeOptions,
    // initialPlace,
    // initialRangeDate,
    cidades,
    ...restOfProps
}) => {
    const {
        cidadeSelecionada,
        setCidadeSelecionada,
        initialRangeDate,
        setInitialRangeDate,
        initialPlace,
        setInitialPlace,
        setMenuInfo,
    } = useContext(AccountContext)

    const theme = useTheme()
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

    const [value, setValue] = useState(initialRangeDate || [null, null])
    const [place, setPlace] = useState(initialPlace || null)
    const [error, setError] = useState(false)
    const isColumn = column || isMobile

    const router = useRouter()

    return (
        <StyledBox
            isColum={isColumn}
            component="form"
            autoComplete="off"
            onFocus={() => setError(false)}
            onSubmit={(e) => {
                e.preventDefault()
                const formData = {
                    place,
                    dataCheckin: value[0]
                        ? format(value[0], 'yyyy/MM/dd')
                        : null,
                    dataCheckout: value[1]
                        ? format(value[1], 'yyyy/MM/dd')
                        : null,
                }

                if (!formData.place) {
                    setError(true)
                } else {
                    Object.keys(formData).forEach(
                        (k) =>
                            (formData[k] == null || formData[k] === '') &&
                            delete formData[k]
                    )

                    if (typeof handleSubmit === 'function') {
                        handleSubmit(formData)
                    }
                }

                setMenuInfo(initialPlace)

                if (
                    formData.dataCheckin !== undefined &&
                    formData.dataCheckout !== undefined &&
                    formData.dataCheckin !== null &&
                    formData.dataCheckout !== null &&
                    cidadeSelecionada !== null
                ) {
                    router.push(
                        `/filtro/?checkin=${formData.dataCheckin}&checkout=${formData.dataCheckout}&id=${cidadeSelecionada}`
                    )
                }
            }}
            {...restOfProps}
        >
            <ClickAwayListener onClickAway={() => setError(false)}>
                <Tooltip
                    title={
                        <Stack direction="row" alignItems="center" spacing={1}>
                            <ErrorOutline />
                            <Typography variant="caption">
                                O campo localização é obrigatório
                            </Typography>
                        </Stack>
                    }
                    placement="bottom"
                    variant="filled"
                    arrow
                    open={error}
                    componentsProps={{
                        tooltip: {
                            sx: {
                                fontSize: '1.125rem',
                                py: 1,
                                bgcolor: 'error.main',
                                '& .MuiTooltip-arrow': {
                                    color: 'error.main',
                                },
                            },
                        },
                    }}
                >
                    <Autocomplete
                        id="location-auto-complete"
                        options={cidades || []}
                        getOptionLabel={(option) => option}
                        noOptionsText="Nenhum local encontrado"
                        value={place}
                        onChange={(option) => {
                            const selection = option.target

                            switch (selection.innerText) {
                                case 'Hong Kong':
                                    setCidadeSelecionada(1)
                                    setPlace('Hong Kong')
                                    setInitialPlace('Hong Kong')
                                    break
                                case 'Bangkok':
                                    setCidadeSelecionada(2)
                                    setPlace('Bangkok')
                                    setInitialPlace('Bangkok')

                                    break
                                case 'Londres':
                                    setCidadeSelecionada(3)
                                    setPlace('Londres')
                                    setInitialPlace('Londres')

                                    break
                                case 'Singapura':
                                    setCidadeSelecionada(4)
                                    setPlace('Singapura')
                                    setInitialPlace('Singapura')

                                    break
                                case 'São Paulo':
                                    setCidadeSelecionada(5)
                                    setPlace('São Paulo')
                                    setInitialPlace('São Paulo')

                                    break
                                case 'Rio de Janeiro':
                                    setCidadeSelecionada(6)
                                    setPlace('Rio de Janeiro')
                                    setInitialPlace('Rio de Janeiro')

                                    break
                                case 'Dubai':
                                    setCidadeSelecionada(7)
                                    setPlace('Dubai')
                                    setInitialPlace('Dubai')

                                    break
                                case 'Nova York':
                                    setCidadeSelecionada(8)
                                    setPlace('Nova York')
                                    setInitialPlace('Nova York')

                                    break
                                case 'Porto':
                                    setCidadeSelecionada(9)
                                    setPlace('Porto')
                                    setInitialPlace('Porto')

                                    break
                                case 'Paris':
                                    setCidadeSelecionada(10)
                                    setPlace('Paris')
                                    setInitialPlace('Paris')

                                    break
                                default:
                                    setCidadeSelecionada(1)
                                    setPlace(null)
                                    setInitialPlace(null)
                                    break
                            }
                        }}
                        selectOnFocus
                        clearOnBlur
                        handleHomeEndKeys
                        ListboxProps={{
                            sx: {
                                maxHeight: '15rem',
                                mt: '5px',
                                overflowY: 'auto',
                                '&::-webkit-scrollbar': {
                                    bgcolor: 'gray',
                                    width: '.5rem',
                                },
                                '&::-webkit-scrollbar-track': {
                                    boxShadow: 'inset 0 0 6px rgba(0,0,0,0.1)',
                                    bgcolor: 'white',
                                },
                                '&::-webkit-scrollbar-thumb': {
                                    bgcolor: 'gray',
                                    borderRadius: '5px',
                                },
                            },
                        }}
                        renderInput={(params) => {
                            const novo = {
                                ...params,
                                InputProps: {
                                    ...params.InputProps,
                                    disableUnderline: true,
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <Place />
                                        </InputAdornment>
                                    ),
                                },
                            }
                            return (
                                <TextField
                                    {...novo}
                                    name="place"
                                    label="Localização"
                                    placeholder="Onde vamos?"
                                    variant="filled"
                                />
                            )
                        }}
                    />
                </Tooltip>
            </ClickAwayListener>

            {!isColumn && <Divider orientation="vertical" flexItem />}

            <LocalizationProvider locale={ptBR} dateAdapter={AdapterDateFns}>
                <DateRangePicker
                    startText="Check-in"
                    endText="Check-out"
                    value={value}
                    disablePast
                    desktopModeMediaQuery="@media (min-width:700px)"
                    clearable
                    clearText="Limpar"
                    cancelText="Cancelar"
                    inputFormat="dd/MM/yyyy"
                    toolbarFormat="dd/MMMM"
                    mask="__/__/____"
                    toolbarTitle="Selecione o período"
                    onChange={(newValue) => {
                        setValue(newValue)
                        setInitialRangeDate(newValue)
                    }}
                    renderInput={(startProps, endProps) => (
                        <Stack
                            direction={isColumn ? 'column' : 'row'}
                            flex="1 1 auto"
                        >
                            <TextField
                                sx={{ flex: '1 1 min-content' }}
                                variant="filled"
                                fullWidth
                                InputProps={{
                                    className: 'InputBase-root-start-date',
                                    disableUnderline: true,
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            {' '}
                                            <DateRange />{' '}
                                        </InputAdornment>
                                    ),
                                    componentsProps: {
                                        input: {
                                            name: 'dataCheckin',
                                        },
                                    },
                                }}
                                {...{
                                    ...startProps,
                                    inputProps: {
                                        ...startProps.inputProps,
                                        placeholder: 'Quando?',
                                    },
                                }}
                            />
                            <TextField
                                sx={{ flex: '1 1 min-content' }}
                                variant="filled"
                                fullWidth
                                InputProps={{
                                    className: 'InputBase-root-end-date',
                                    disableUnderline: true,
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <DateRange />
                                        </InputAdornment>
                                    ),
                                    componentsProps: {
                                        input: {
                                            name: 'dataCheckout',
                                        },
                                    },
                                }}
                                {...{
                                    ...endProps,
                                    inputProps: {
                                        ...endProps.inputProps,
                                        placeholder: 'Quando?',
                                    },
                                }}
                            />
                        </Stack>
                    )}
                />
            </LocalizationProvider>

            {!isColumn && (
                <Divider orientation="vertical" variant="middle" flexItem />
            )}

            {isColumn ? (
                <Button
                    className="bg-primary-color hover:bg-[#f0572d]"
                    variant="contained"
                    color="primary"
                    type="submit"
                    disableElevation
                    sx={{
                        borderRadius: '0px',
                        color: 'white',
                        backgroundColor: 'orange',
                        '&:hover': {
                            color: 'white',
                            backgroundColor: 'bg-[#f0572d]',
                        },
                    }}
                    startIcon={<Search />}
                >
                    Pesquisar
                </Button>
            ) : (
                <Fab
                    type="Submit"
                    variant="circular"
                    color="black"
                    className="text-white bg-primary-color hover:bg-[#f0572d]"
                >
                    <Search fontSize="medium" />
                </Fab>
            )}
        </StyledBox>
    )
}

const StyledBox = styled(Box)(
    ({ theme, isColum }) => `
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    margin: 0 auto;
    min-height: 80px;
    // min-width: 160px;

    background-color: ${theme.palette.background.paper};
    color: ${theme.palette.text.secondary};
    border: 2px solid ${theme.palette.divider};
    border-radius: ${theme.spacing(1)};
    overflow: hidden;

    & > *:not(.MuiDivider-root, Button) {
        flex: 1 0 min-content;
    }


    & > .MuiDivider-root {
        margin-inline: 2px;
    }

    & > .MuiFab-root{
        background-color: 'red';
        margin-inline: ${theme.spacing(1)};
    }

    & .MuiInputBase-root{
        cursor: pointer;
        min-width: 120px;
        padding: ${theme.spacing(1)};
        background-color: ${theme.palette.background.paper};
        border-radius: ${theme.spacing(4)};

        &:hover{
            background-color: ${darken(theme.palette.background.paper, 0.1)};
        }

        &:focus-within{
            box-shadow: 0 6px 20px rgba(0,0,0,0.2);
            background-color: ${lighten(theme.palette.background.paper, 0.3)};
        }

        &.InputBase-root-start-date{
            border-bottom-right-radius: 0;
            border-top-right-radius: 0;
        }
        &.InputBase-root-end-date{
            border-bottom-left-radius: 0;
            border-top-left-radius: 0;
        }

        & .MuiInputBase-input{
            cursor: pointer;
            padding-right: 0 ;
            padding-left: 0;
            padding-top: 25px;
            padding-bottom: ${theme.spacing(1)};
            min-width: 100px;
        }
    }

    & .MuiFormLabel-root{
        font-weight: 800;
        transform: translate(50%,10px) scale(0.8);
    }

    ${
        isColum &&
        `
        flex-direction: column;
        width: 100%;
        align-items: stretch;
        border-radius: 0;

        & .MuiInputBase-root{
            border-radius: 0;
        }
    `
    }
`
)

export default calendar
