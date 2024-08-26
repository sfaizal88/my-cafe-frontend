/**
 * My Cafe Page component
 * @author - Faizal 
 * @date - 23rd August 2024
 */
// GENERIC IMPORT
import {Box, Grid, Tooltip} from '@mui/material';
import {useEffect, useState} from 'react';
import {useNavigate, Link} from 'react-router-dom';

// COMMON COMPONENT
import { Container, Loader, SearchField, Button, ConfirmModel } from '../../atoms';
import { EmptyScreen, EmptyLabel } from '../../molecules';

// UTILS IMPORT
import type {CafeShopType} from '../../../utils/types';

// ROUTER IMPORT
import * as PATH from '../../routes/constants';

// CUSTOME HOOK 
import {useManageCafeShopHook} from './useHook';

// API IMPORT
import {useCafeShopListQuery} from '../../../api/cafeShop';

// STYLE IMPORT
import './styles.css';


const CafeShopPage = () => {
    // DECLARE STATE
    const [unchangedCafeShopList, setUnchangedCafeShopList] = useState<CafeShopType[]>([]);
    const [cafeShopList, setCafeShopList] = useState<CafeShopType[]>([]);
    const [isPageLoading, setLoading] = useState<boolean>(false);
    const [searchKeyword, setSearchKeyword] = useState<string>('');
    const [selectedCafeShop, setSelectedCafeShop] = useState<CafeShopType>({} as CafeShopType);
    const [isDeleteModelOpen, setDeleteModelOpen] = useState<boolean>(false);
    const cellWidth = [3, 3, 2, 2, 2];

    // DECLARE API CALL
    const cafeShopListQuery = useCafeShopListQuery();

    // DECLARE NAVIGATE
    const navigate = useNavigate();
    const manageCafeShopHook = useManageCafeShopHook({
        setLoading,
    });

    // GO TO SPECIFIC PAGE
    const gotoPage = (path: string) => {
        navigate(path);
    }

    // HANDLE FILTER LIST
    const handleFilterChange = (event: any) => {
        const keyword = event.target.value.trim();
        const output = unchangedCafeShopList.filter(item => !keyword || item.location.toLowerCase().indexOf(keyword.toLowerCase()) > -1);
        setSearchKeyword(keyword);
        setCafeShopList(output);
    };

    useEffect(() => {
        if (!cafeShopListQuery.isLoading) {
            setCafeShopList?.(cafeShopListQuery.data.output);
            setUnchangedCafeShopList?.(cafeShopListQuery.data.output);
        }
    }, [cafeShopListQuery.data]); // eslint-disable-line react-hooks/exhaustive-deps

    if (isPageLoading || cafeShopListQuery.isLoading) return <Loader/>

    return (
        <Container title='Cafe Shop' info="A list of all the cafe shop in your account including their name, location.">
            <Box className='table-controller'>
                <Box flex={1}>
                    <SearchField name="search-field" placeholder="Search by cafe shop(s) location..." 
                        onChangeHandler={handleFilterChange} value={searchKeyword}/>
                </Box>
                <Box className='text-right' flex={3}>
                    <Button label="Create new cafe" type='button' onClickHandler={() => gotoPage(PATH.ADD_CAFE_PATH)} externalClassName='mt-2 sm:mt-0'/>
                </Box>
            </Box>
            <Grid container className='table-header'>
                <Grid item xs={cellWidth[0]}>Cafe Shop Name</Grid>
                <Grid item xs={cellWidth[1]}>Description</Grid>
                <Grid item xs={cellWidth[2]}>Total Employees</Grid>
                <Grid item xs={cellWidth[3]}>Location</Grid>
                <Grid item xs={cellWidth[4]} className='text-right'>Actions</Grid>
            </Grid>
            {cafeShopList?.length > 0  ? 
            cafeShopList.map(item => (
                <Grid container className='table-row' key={`cafe-shop-list-${item.id}`}>
                    <Grid item xs={cellWidth[0]}>
                        <Box display='flex' alignItems='center'>
                            <i className="fa fa-coffee" aria-hidden="true"></i>&nbsp;&nbsp;
                            <Tooltip title={item.name}>
                                <Box className="truncate" display='inline-block'>{item.name}</Box>
                            </Tooltip>
                        </Box>
                    </Grid>
                    <Grid item xs={cellWidth[1]}>
                        <Tooltip title={item.description}>
                            <Box className="truncate" display='inline-block'>{item.description || <EmptyLabel/>}</Box>
                        </Tooltip>
                    </Grid>
                    <Grid item xs={cellWidth[2]}>
                        <i className="fa fa-users" aria-hidden="true"></i>&nbsp;&nbsp;{item.total_employees?.toLocaleString() || 0}
                    </Grid>
                    <Grid item xs={cellWidth[3]}>
                        <Tooltip title={item.location}>
                            <Box className="truncate" display='inline-block'>{item.location}</Box>
                        </Tooltip>
                    </Grid>
                    <Grid item xs={cellWidth[4]} className='text-right'>
                        <Link to={`${PATH.ADD_CAFE_PATH}/${item.id}`}>Edit</Link>&nbsp;&nbsp;|&nbsp;&nbsp; 
                        <Box className='link' onClick={() => {setSelectedCafeShop(item);setDeleteModelOpen(true)}}>Delete</Box>&nbsp;&nbsp;|&nbsp;&nbsp; 
                        <Link to={`${PATH.VIEW_CAFE_PATH}/${item.id}`}>View</Link>
                    </Grid>
                </Grid>)) : 
                <EmptyScreen
                    title="No cafe shop found"
                    subtitle="Please add new cafe shop by clicking create new cafe shop button"
                    button={<Button label="Create new cafe shop" type='button' onClickHandler={() => gotoPage(PATH.ADD_CAFE_PATH)}/>}
                    icon={<i className="fa fa-ban" aria-hidden="true"></i>}
                />}
                {isDeleteModelOpen && <ConfirmModel 
                    confirmBtnLabel='Delete' confirmBtnEvent={() => {manageCafeShopHook.deleteCafeShopById(selectedCafeShop.id || '');setDeleteModelOpen(false);}}
                    cancelBtnLabel='Cancel' cancelBtnEvent={() => setDeleteModelOpen(false)}
                    title='Delete Cafe Shop'
                    info={`Are you sure you want to delete "${selectedCafeShop.name}" cafe shop? This action will also remove all associated employees?`}
                />}
        </Container>
    )
}

export default CafeShopPage;