import React from 'react';
import Grid from '../common/grid.common';
import GridOptions from '../common/maps/grid-layout.map';

const PageNotFound = () =>{
    return (
        <Grid item xs={12} {...GridOptions.contRowCenterCenter}>
            <h3>Requested URL was not found</h3>
        </Grid>
    )
}

export default PageNotFound;