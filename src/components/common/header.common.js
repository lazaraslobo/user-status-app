import React from 'react';
import Grid from '../common/grid.common';
import GridOptions from '../common/maps/grid-layout.map';

const headerComp = (headerProps) =>{
    return(
        <Grid {...GridOptions.contRowCenterCenter} item xs={12} className="common-header">
            <Grid item {...GridOptions.contRowCenterCenter} xs={10}>
                <h2>{headerProps.title}</h2>
            </Grid>
            <Grid item {...GridOptions.contRowCenterCenter} xs={2}>
                {headerProps.children}
            </Grid>
        </Grid>
    )
}

export default headerComp;