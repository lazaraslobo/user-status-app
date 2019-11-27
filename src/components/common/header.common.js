import React from 'react';
import Grid from '../common/grid.common';
import GridOptions from '../common/maps/grid-layout.map';

const headerComp = (headerProps) =>{
    return(
        <Grid {...GridOptions.contRowCenterCenter} item xs={12} className="common-header">
            <Grid item {...GridOptions.contRowStartCenter} xs={6}>
                <h2 className="main-heading">{headerProps.title}</h2>
            </Grid>
            <Grid item {...GridOptions.contRowCenterCenter} xs={6}>
                {headerProps.children}
            </Grid>
        </Grid>
    )
}

export default headerComp;