import { Button } from 'antd';
import React, { useState } from 'react';

interface Plan {
  planId: string;
  active: boolean;
}

interface PaynowButtonProps {
  plan: Plan;
  onSubscribe: (planId: string) => Promise<void>;
  activePlan: Plan | null;
}

const PaynowButton: React.FC<PaynowButtonProps> = ({ plan, onSubscribe, activePlan }) => {
  const [isSubscribingToPlan, setIsSubscribingToPlan] = useState(false);

  const handleSubscription = async (planId: string) => {
    setIsSubscribingToPlan(true);
    await onSubscribe(planId);
    setIsSubscribingToPlan(false);
  };

  return (
    <Button
      type="primary"
      onClick={() => handleSubscription(plan.planId)}
      disabled={!!activePlan && !plan.active}
      loading={isSubscribingToPlan}
    >
      Pay Now
    </Button>
  );
};

export default PaynowButton;
