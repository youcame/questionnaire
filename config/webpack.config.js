import darkTheme from '@ant-design/dark-theme';

export default({
    lessLoader:
    {
      loader: 'less-loader',
      options: {
        modifyVars: darkTheme,
      },
    },
})