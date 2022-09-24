import React, { useState } from 'react'

export default function Tabs() {
  const data = [
    {
      id: 'panel-react',
      title: 'React',
      text: 'React (also known as React.js or ReactJS) is a free and open-source front-end JavaScript library for building user interfaces based on UI components. It is maintained by <a href="https://about.facebook.com/">Meta</a> (formerly Facebook) and a community of individual developers and companies.',
    },
    {
      id: 'panel-vue',
      title: 'Vue',
      text: 'Vue.js is an open-source model–view–viewmodel front end JavaScript framework for building user interfaces and <a href="https://en.wikipedia.org/wiki/Single-page_application">single-page applications</a>. It was created by Evan You, and is maintained by him and the rest of the active core team members.',
    },
    {
      id: 'panel-angular',
      title: 'Angular',
      text: 'AngularJS is a discontinued free and open-source JavaScript-based web framework for developing single-page applications. It was maintained mainly by <a href="https://www.apple.com/">Google</a> and a community of individuals and corporations.',
    },
  ]

  const [activePanelId, setActivePanelId] = useState(data[0].id)

  const handleTablistClick = (id) => setActivePanelId(id)

  const isPanelActive = (id) => id === activePanelId

  const handleKeyDown = (e) => {
    switch (e.code) {
      case 'ArrowRight':
        e.preventDefault()
        changeFocusToItem(e.currentTarget, 'next')
        break

      case 'ArrowLeft':
        e.preventDefault()
        changeFocusToItem(e.currentTarget, 'prev')
        break

      case 'Home':
        e.preventDefault()
        changeFocusToItem(e.currentTarget, 'first')
        break

      case 'End':
        e.preventDefault()
        changeFocusToItem(e.currentTarget, 'last')
        break

      case 'Enter':
      case 'Space':
        handleTablistClick(e.target.dataset.tabpanelId)
        break

      default:
        break
    }
  }

  const changeFocusToItem = (target, item) => {
    const items = document.querySelectorAll('[role="tab"]')
    const innerItems = document.querySelectorAll('a')

    let index = [...target.children].indexOf(
      document.activeElement.closest('[role="presentation"]'),
    )

    innerItems.forEach((el) => {
      return el.parentElement.classList.contains('tabs__panel--active')
        ? el.setAttribute('tabIndex', -1)
        : el.setAttribute('tabIndex', 0)
    })

    if (item === 'last') {
      index = items.length - 1
    } else if (item === 'first') {
      index = 0
    } else if (item === 'next') {
      index = index === items.length - 1 ? 0 : index + 1
    } else if (item === 'prev') {
      index = index <= 0 ? items.length - 1 : index - 1
    }

    items[index]?.focus()
  }

  return (
    <div className="tabs">
      <ul className="tabs__list" role="tablist" onKeyDown={handleKeyDown}>
        {data.map(({ id, title, index }, idx) => (
          <li key={id} role="presentation">
            <button
              aria-selected={isPanelActive(id)}
              aria-controls={`tabpanel-${idx}`}
              id={`tab-${idx}`}
              onClick={() => handleTablistClick(id)}
              role="tab"
              tabIndex={isPanelActive(id) ? 0 : -1}
              className={`
              tabs__list-item   
              ${isPanelActive(id) ? 'tabs__list-item--active' : ''}
            `}
            >
              {title}
            </button>
          </li>
        ))}
      </ul>

      <p>
        Front-end web development is the development of the graphical user
        interface of a website, through the use of HTML, CSS, and JavaScript, so
        that users can view and interact with that website.
      </p>
      <p>
        There are several libraries and frameworks that help speed up the front
        end development. The most popular are React, Vue, and Angular.
      </p>

      <div className="tabs__panel-container">
        {data.map(({ id, text }, idx) => (
          <div
            role="tabpanel"
            aria-labelledby={`tab-${idx}`}
            key={id}
            id={`tabpanel-${idx}`}
            tabIndex={isPanelActive(id) ? 0 : -1}
            className={`
              tabs__panel
              ${isPanelActive(id) ? 'tabs__panel--active' : ''}
            `}
            dangerouslySetInnerHTML={{ __html: text }}
          />
        ))}
      </div>
    </div>
  )
}
