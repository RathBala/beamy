const colors = {
  // Surfaces / background greys
  surface: {
    0: '#000000', // primary page background (black)
    100: '#18181b', // raised surfaces / cards
  },
  // Brand palette
  brand: {
    primary: '#FFD633', // primary yellow
    primary_hover: '#EBC325',
  },
  // Functional/support colours
  support: {
    info: '#0EA5E9',
    success: '#10B981',
    warning: '#F59E0B',
    error: '#EF4444',
  },
};

const radii = {
  sm: '0.25rem',
  md: '0.5rem',
  lg: '1rem',
};

const spacing = {
  xs: '0.25rem',
  sm: '0.5rem',
  md: '1rem',
  lg: '2rem',
};

const shadow = {
  raised: '0 2px 6px rgb(0 0 0 / 0.3)',
};

module.exports = {
  colors,
  radii,
  spacing,
  shadow,
}; 