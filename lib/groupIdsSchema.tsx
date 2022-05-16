import { Select } from "../components/input";

export const GroupIdsSchema = (groups, multiple) => ({
  title: multiple ? 'Научные группы' : 'Научная группа',
  render: (group_ids) => (
    <>
      {String(group_ids || '').split('; ').map((group_id, index, array) => (
        <>
          <a
            key={group_id}
            href={'/tables/groups?id=' + group_id} target="_blank"
            onClick={(e) => e.stopPropagation()}
          >{group_id}</a>
          {(index + 1) < array.length ? '; ' : ''}
        </>
      ))}
    </>
  ),
  renderFormRow: (props, action) => (
    <Select
      key={props.key}
      multiple={multiple && action !== 'search'}
      items={groups}
      getOptionLabel={(item) => String(item.id)}
      {...props}
    />
  )
});

