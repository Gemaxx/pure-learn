﻿using System;
using System.Collections.Generic;

namespace api.Models;

public partial class LearningResourceType
{
    public long Id { get; set; }

    public string Name { get; set; } = null!;

    public string UnitType { get; set; } = null!;

    public virtual ICollection<LearningResource> LearningResources { get; set; } = new List<LearningResource>();
}
