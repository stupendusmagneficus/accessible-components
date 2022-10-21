import { useRef, useState } from 'react'

export default function RadioGroup() {
  const options = [
    { name: 'radio', id: 1, label: 'Email' },
    { name: 'radio', id: 2, label: 'Phone' },
    { name: 'radio', id: 3, label: 'Telegram' },
  ]

  const [checkedList, setCheckedList] = useState(options)
  const [isChecked, setIsChecked] = useState(options[0].id)

  const isRadioChecked = (id) => id === isChecked
  const handleRadioListClick = (id) => setIsChecked(id)

  const radioRefs = useRef([])

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

  const changeFocusToItem = (item) => {
    let index = options.findIndex((item) => item.id === isChecked)

    if (item === 'next') {
      index = index === radioRefs.current.length - 1 ? 0 : index + 1
    } else if (item === 'prev') {
      index = index <= 0 ? radioRefs.current.length - 1 : index - 1
    }

    setIsChecked(radioRefs.current[index].dataset.id)
    radioRefs.current[index].focus()
  }

  const handleKeyDown = (e) => {
    console.log(e)
    switch (e.key) {
      case 'ArrowLeft':
      case 'ArrowDown': {
        e.preventDefault()
        changeFocusToItem('prev')
        break
      }
      case 'ArrowRight':
      case 'ArrowUp': {
        e.preventDefault()
        changeFocusToItem('next')
        break
      }
      default: {
        break
      }
    }
  }

  return (
    <main>
      <h1 className="heading">Accessible radio group</h1>
      <section className="radios">
        <form onSubmit={handleSubmit}>
          <div role="radiogroup" aria-labelledby="group_label">
            <h2 id="group_label">
              Please select your preferred contact method
            </h2>
            <div className="radio-group" onKeyDown={handleKeyDown}>
              {checkedList.map(({ id, name, checked, label }, index) => (
                <div key={id} className="radio-group__wrapper">
                  <input
                    type="radio"
                    name={name}
                    value={id}
                    id={id}
                    aria-checked={isRadioChecked(id)}
                    checked={isRadioChecked(id)}
                    onChange={(e) => changeList(id, e.target.checked)}
                    onClick={() => handleRadioListClick(id)}
                    onFocus={() => handleRadioListClick(id)}
                    className="radio-group__item"
                    tabIndex={isRadioChecked(id) ? 0 : -1}
                    ref={(element) => {
                      radioRefs.current[index] = element
                    }}
                  />
                  <label className="radio-group__label" htmlFor={id}>
                    {label}
                  </label>
                </div>
              ))}
            </div>
            <button type="submit" className="radio-group__submit">
              Submit
            </button>
          </div>
        </form>
      </section>
    </main>
  )
}
