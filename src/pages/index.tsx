import classNames from 'classnames';
import { Link } from 'gatsby';
import * as React from 'react';
import { GlowingRing } from '../components/elements/landing/GlowingRing';
import { GlowingText } from '../components/elements/landing/GlowingText';
import { GradientText } from '../components/elements/landing/GradientText';
import AuthorsSection from '../components/Index/AuthorsSection';
import Layout from '../components/layout';
import SEO from '../components/seo';
import TopNavigationBar from '../components/TopNavigationBar/TopNavigationBar';

const whiteButtonClassesBig =
  'text-xl bg-white px-6 py-3 md:px-8 md:py-4 rounded-lg font-medium text-gray-900 relative';

export default function IndexPage(): JSX.Element {
  return (
    <Layout>
      <SEO title={null} />

      <div className="dark bg-black">
        <TopNavigationBar transparent />
      </div>

      {/* Begin Hero */}
      <div className="-mt-16 bg-black">
        <div className="md:min-h-screen flex flex-col px-4 sm:px-6 lg:px-8">
          <div className="h-6 sm:h-12"></div>

          <div className="flex-1 flex flex-col justify-center">
            <div className="h-24"></div>

            <div className="flex md:justify-center">
              <GlowingText className="md:text-center font-black tracking-tight text-5xl sm:text-6xl md:text-7xl 2xl:text-8xl text-white mt-4">
                Computación Visual
              </GlowingText>
            </div>

            <div className="h-6 sm:h-8"></div>

            <p
              className="
                md:text-center
                text-xl
                sm:text-2xl
                2xl:text-3xl
                font-medium
                leading-snug
                md:!leading-normal
                text-gray-300
              "
            >
              Alguna Descripción <GradientText>Impactante</GradientText>{' '}
              <br className="hidden md:block" />
              sobre la pagina
            </p>

            <div className="h-8 sm:h-12"></div>

            <div className="flex md:justify-center">
              <GlowingRing>
                <Link
                  to="/report"
                  className={classNames(whiteButtonClassesBig, 'inline-block')}
                >
                  Ver Informes
                </Link>
              </GlowingRing>
            </div>
          </div>

          <div className="h-16 sm:h-24"></div>

          <div className="flex md:justify-center md:text-xl text-gray-400">
            <a
              href="https://joincpi.org/"
              className="inline-flex items-center space-x-3 md:space-x-4"
            >
              <div className="h-9 w-9">
                <svg
                  className="inline-block"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 100 100"
                >
                  <g>
                    <path
                      className="fill-current text-[#6600af]"
                      d="M50,5A45,45,0,1,1,5,50,45.05,45.05,0,0,1,50,5m0-5a50,50,0,1,0,50,50A50,50,0,0,0,50,0Z"
                    ></path>
                  </g>
                  <line
                    className="stroke-current stroke-[7px] text-[#be5eff]"
                    style={{ strokeMiterlimit: 10 }}
                    x1="50"
                    y1="27"
                    x2="73.29"
                    y2="65.64"
                  ></line>
                  <line
                    className="stroke-current stroke-[7px] text-[#be5eff]"
                    style={{ strokeMiterlimit: 10 }}
                    x1="50"
                    y1="27"
                    x2="26.71"
                    y2="67"
                  ></line>
                  <circle
                    className="fill-current text-[#961be8]"
                    cx="50"
                    cy="27"
                    r="10"
                  ></circle>
                  <circle
                    className="fill-current text-[#961be8]"
                    cx="26.71"
                    cy="67"
                    r="10"
                  ></circle>
                  <circle
                    className="fill-current text-[#961be8]"
                    cx="73.29"
                    cy="67"
                    r="10"
                  ></circle>
                </svg>
              </div>

              <span>UNAL / 2022-I</span>
            </a>
          </div>
          <div className="h-4 sm:h-6 md:h-16"></div>
        </div>
      </div>
      {/* End Hero */}

      <AuthorsSection />

      <div className="bg-white dark:bg-dark-surface">
        <div className="max-w-screen-xl mx-auto py-12 px-4">
          <p className="text-center text-base leading-6 text-gray-400 dark:text-dark-med-emphasis">
            &copy; 2022 Computación Visual - Universidad Nacional de Colombia.
            Template extraido desde{' '}
            <a
              href="https://usaco.guide/"
              target="_blank"
              className="underline"
              rel="noreferrer"
            >
              Usaco Guide
            </a>
          </p>
        </div>
      </div>
    </Layout>
  );
}
