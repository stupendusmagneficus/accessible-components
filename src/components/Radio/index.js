import { useState } from 'react'

export default function RadioGroup() {
  const options = [
    { name: 'email', id: 1, label: 'Email' },
    { name: 'phone', id: 2, label: 'Phone' },
    { name: 'mail', id: 3, label: 'Mail' },
  ]

  const [checkedList, setCheckedList] = useState(options)

  const changeList = (id, checked) => {
    const newCheckedList = toggleOption(id, checked)
    setCheckedList(newCheckedList)
  }

  const toggleOption = (id, checked) => {
    return options.map((option) =>
      option.id === id ? { ...option, checked } : option,
    )
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(checkedList)
  }

  return (
    <section className="radios" aria-labelledby="group_label">
      <div role="radiogroup">
        <h4 id="group_label">Please select your preferred contact method</h4>
        <div className="radio-group">
          {checkedList.map(({ id, name, checked, label }) => (
            <div key={id}>
              <input
                aria-labelledby="radio_label"
                type="radio"
                name={name}
                value={id}
                id={id}
                checked={checked}
                onChange={(e) => changeList(id, e.target.checked)}
                className="radio-group__item"
              />
              <label className="radio-group__label" id="radio_label">
                {label}
              </label>
            </div>
          ))}
        </div>
        <div>
          <button
            type="button"
            className="radio-group__submit"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      </div>
    </section>
  )
}
