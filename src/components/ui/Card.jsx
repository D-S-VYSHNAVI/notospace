import React from 'react';

/**
 * Card component for displaying content in a card layout
 * @param {Object} props
 * @param {string} props.title - Card title
 * @param {React.ReactNode} props.children - Card content
 * @param {React.ReactNode} props.icon - Icon to display next to title
 * @param {string} props.className - Additional CSS classes
 * @param {React.ReactNode} props.action - Action button/element to display in header
 */
export default function Card({ 
  title, 
  children, 
  icon, 
  className = '', 
  action,
  footer,
  noPadding = false
}) {
  return (
    <div className={`card ${className}`}>
      {title && (
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-800">
          <div className="flex items-center gap-2">
            {icon && <div className="text-gray-500">{icon}</div>}
            <h3 className="font-medium">{title}</h3>
          </div>
          {action && <div>{action}</div>}
        </div>
      )}
      
      <div className={noPadding ? '' : 'p-4'}>
        {children}
      </div>
      
      {footer && (
        <div className="p-4 border-t border-gray-200 dark:border-gray-800">
          {footer}
        </div>
      )}
    </div>
  );
}