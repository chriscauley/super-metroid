import toolbar from '@unrest/vue-toolbar'

const TODO = () => console.warn('TOOD')

export default (_component) => {
  const getTools = () => {
    const tools = [
      { slug: 'play', icon: 'fa fa-gamepad' },
      { slug: 'clear', icon: 'fa fa-trash', select: TODO },
      { slug: 'undo', icon: 'fa fa-undo', select: TODO },
    ]
    if (true) {
      // if (component.$auth.user?.is_superuser) {
      tools.push({ slug: 'move_all', icon: 'fa fa-arrows' })
    }
    return tools
  }
  const initial = { selected: { tool: 'play' } }
  return toolbar.ToolStorage('tools__tracker', { tools: getTools, initial })
}
