frontend-app-lti
################

Purpose
=======

This MFE application adds a custom user interface for various Open edX LTI services, such has the Open edX LTI Tool Plugin.

Getting Started
===============

Devstack Installation
---------------------

Follow these steps to provision, run, and enable an instance of the
LTI MFE for local development via the `devstack`_.

.. _devstack: https://github.com/openedx/devstack#getting-started

#. Setup and configure the Open edX devstack and start the LMS service.

#. Setup and configure the `Open edX LTI Tool Plugin`_.

.. _Open edX LTI Tool Plugin: https://github.com/Pearson-Advance/openedx-lti-tool-plugin

#. Clone the LTI MFE repository.

   .. code-block::

      cd ~/workspace/src
      git clone git@github.com:Pearson-Advance/frontend-app-lti.git

#. Start this MFE with:

   .. code-block::

      cd frontend-app-lti
      nvm use
      npm ci
      npm start
