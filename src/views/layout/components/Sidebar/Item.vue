<script>
export default {
  name: 'MenuItem',
  functional: true,
  props: {
    icon: {
      type: String,
      default: '',
    },
    title: {
      type: String,
      default: '',
    },
  },
  render(h, context) {
    const { icon, title } = context.props;
    const vnodes = [];

    if (icon) {
      vnodes.push(<svg-icon icon-class={icon} class-name="menu-icon" />);
    }

    if (title) {
      vnodes.push(<span slot="title">{title}</span>);
    }
    return vnodes;
  },
};
</script>

<style lang="scss" scoped>
@import '~@/styles/css-theme/handle.scss';
.menu-icon {
  cursor: pointer;
  font-size: 1.3rem;
  vertical-align: middle;
  margin: 0 0.625rem;
  // @include font_color_im('menu_font');
}
</style>
