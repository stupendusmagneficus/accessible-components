import { useRef, useState } from 'react'

export default function RadioGroup() {
  const options = [
    { name: 'radio', id: '1', label: 'Email' },
    { name: 'radio', id: '2', label: 'Phone' },
    { name: 'radio', id: '3', label: 'Telegram' },
  ]

  const [checkedList, setCheckedList] = useState(options)
  const [isChecked, setIsChecked] = useState(options[0].id)
  const [showData, setShowData] = useState(false)

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
    setShowData(true)
    console.log(checkedList)
  }

  const changeFocusToItem = (item) => {
    setShowData(false)
    let index = options.findIndex((item) => item.id === isChecked)

    if (item === 'next') {
      index = index === radioRefs.current.length - 1 ? 0 : index + 1
    } else if (item === 'prev') {
      index = index <= 0 ? radioRefs.current.length - 1 : index - 1
    }

    setIsChecked(radioRefs.current[index].dataset.id)
    radioRefs.current[index].focus()
  }

  const selectedValue = checkedList.filter((item) => item.checked)

  const handleKeyDown = (e) => {
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
            <div
              className="radio-group"
              onKeyDown={handleKeyDown}
              aria-labelledby="description"
            >
              {checkedList.map(({ id, name, checked, label }, index) => (
                <div key={id} className="radio-group__wrapper">
                  <input
                    data-id={id}
                    type="radio"
                    name={name}
                    value={id}
                    id={id}
                    aria-checked={isRadioChecked(id)}
                    checked={checked}
                    onChange={(e) => changeList(id, e.target.checked)}
                    onFocus={() => handleRadioListClick(id)}
                    onClick={(e) => changeList(id, e.target.checked)}
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
            <div>
              <button type="submit" className="radio-group__submit">
                Submit
              </button>
            </div>
            {showData && (
              <p className="radio-group__selected">
                Your selected option is - {selectedValue[0].label}
              </p>
            )}
          </div>
        </form>
      </section>
      <p id="description" className="radio-group__description">
        In case of using keyboard put "Space" to select value.
      </p>
    </main>
  )
}
