import React from 'react'
import './Pricing.scss'
import { BiCheckSquare } from 'react-icons/bi'

const freeFeatures = ['Up to 5 events per month', 'Up to 10 people per event']
const premiumFeatures = [
  'Unlimited Events',
  'Up to 100 people per event',
  'Ad free',
]

const Pricing = () => {
  return (
    <div className='pricing-page'>
      <div className='header'>
        <h1>Pricing</h1>
        <h2>
          Start using <span className='primary'>Group Sync</span> for free!
        </h2>
        <p>
          For more events and people per event and an ad-free experience, switch
          to our premium plan
        </p>
      </div>

      <div className='price-options'>
        <div className='free card'>
          <div className='type'>Basic</div>
          <div className='price-container'>
            <div className='price'>Free</div>
            <div className='price-description'>Forever</div>
          </div>
          <div className='description'>
            Great for occasional small friend parties or events.
          </div>
          <button className='select-membership'>Current Service</button>
          <div className='features'>
            <h4>Includes:</h4>
            <ul>
              {freeFeatures.map(feat => {
                return (
                  <li>
                    <BiCheckSquare className='check-icon' />
                    {feat}
                  </li>
                )
              })}
            </ul>
          </div>
        </div>
        <div className='card premium primary'>
          <div className='type'>Premium</div>
          <div className='price-container'>
            <div className='price'>$12</div>
            <div className='price-description'>One time</div>
          </div>
          <div className='description'>
            Perfect for big events or users with a large number of events.
          </div>
          <button className='select-membership primary'>Get Started</button>
          <div className='features'>
            <h4>All basic features, plus:</h4>
            <ul>
              {premiumFeatures.map(feat => {
                return (
                  <li>
                    <BiCheckSquare className='check-icon' />
                    {feat}
                  </li>
                )
              })}
            </ul>
          </div>
        </div>
      </div>
      <div className='questions'>
        <h2>Have Questions?</h2>
        <p>
          Reach out to me:{' '}
          <span className='primary'>jesselindcs@gmail.com</span>
        </p>
      </div>
    </div>
  )
}

export default Pricing
