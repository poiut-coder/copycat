import PropTypes from 'prop-types';
import { forwardRef } from 'react';
import { Link as RouterLink } from 'react-router-dom';
// @mui
import { useTheme } from '@mui/material/styles';
import { Box, Link } from '@mui/material';

// ----------------------------------------------------------------------

const Logo2 = forwardRef(({ disabledLink = false, sx, ...other }, ref) => {
    const theme = useTheme();

    // OR using local (public folder)
    // -------------------------------------------------------
    const logo2 = (
      <Box
        component="img"
        src="public/assets/images/logo.png"
        sx={{ width: 40, height: 40, cursor: 'pointer', ...sx }}
      />
    );

    if (disabledLink) {
        return <>{logo2}</>;
    }

    return (
        <Link to="/" component={RouterLink} sx={{ display: 'contents' }}>
            {logo2}
        </Link>
    );
});

Logo2.propTypes = {
    sx: PropTypes.object,
    disabledLink: PropTypes.bool,
};

export default Logo2;
