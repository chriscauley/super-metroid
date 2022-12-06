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
      tools.push({ slug: 'admin_move', icon: 'fa fa-arrows' })
    }
    return tools
  }
  const initial = { selected: { tool: 'play' } }
  const storage = toolbar.ToolStorage('tools__tracker', { tools: getTools, initial })
  storage.schema = {
    type: 'object',
    properties: {
      large_icons: { type: 'boolean' },
    },
  }
  return storage
}
