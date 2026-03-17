import { RoleSelection } from '../RoleSelection';

export default function RoleSelectionExample() {
  return (
    <div className="p-8">
      <RoleSelection onRoleSelect={(role) => console.log('Role selected:', role)} />
    </div>
  );
}