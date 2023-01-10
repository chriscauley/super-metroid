import toolbar from '@unrest/vue-toolbar'

export default (component) => {
  const getTools = () => {
    const tools = [{ slug: 'item', icon: 'fa fa-archive' }]
    if (component.area.svg_coords) {
      tools.push({ slug: 'grid', icon: 'fa fa-th' })
    }
    return tools
  }
  const initial = {
    selected: { tool: 'item' },
  }
  const storage = toolbar.ToolStorage('area_storage', { tools: getTools, initial })
  return storage
}
